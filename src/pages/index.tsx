import React, { useState } from 'react';
import Chart from 'chart.js/auto';
import Header from 'src/components/header';
import Axis from 'src/components/axis';
import Search from 'src/components/search';
import { cerealType } from 'src/type/cereal.type';
import { axisType } from 'src/type/axis.type';
import styles from './index.module.css';

export default function Home
  (
    props: {
      cereals: cerealType[],
      uniqMfrArr: string[],
      uniqTypeArr: string[]
    }
  )
{
  // 初期値にはX軸、Y軸で固定値をセット
	const [xAxis, setXAxis] = useState<axisType>('calories');
	const [yAxis, setYAxis] = useState<axisType>('protein');

  // 初期値には空文字でデータは絞り込みしない
  const [searchMfrKey, setSearchMfrKey] = useState('');
  const [searchTypeKey, setSearchTypeKey] = useState('');

  React.useEffect(() => {
    let myChart: Chart;

    // グラフに表示するデータ
    const cereals = props.cereals.filter((cereal: cerealType) => {
      return (!searchMfrKey || searchMfrKey === cereal['mfr']) && 
      (!searchTypeKey || searchTypeKey === cereal['type'])
    }).map(cereal => {
      return { x: cereal[xAxis], y: cereal[yAxis] };
    })

    const config: any = {
      type: 'scatter',
      data: {
        datasets: [
          {
            label: '80 Cereals',
            backgroundColor: 'rgb(255, 99, 132)',
            data: cereals,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            position: 'bottom',
          },
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: xAxis,
              font: {
                size: 20,
                weight: 'bold',
                lineHeight: 1.2,
              },
              padding: { top: 20, left: 0, right: 0, bottom: 0 },
            },
          },
          y: {
            display: true,
            title: {
              display: true,
              text: yAxis,
              font: {
                size: 20,
                weight: 'bold',
                lineHeight: 1.2,
              },
              padding: { top: 20, left: 0, right: 0, bottom: 0 },
            },
          },
        },
      },
    };
    myChart = new Chart(
      document.getElementById('myChart') as HTMLCanvasElement,
      config
    );
    return () => {
			myChart.destroy();
    };
  }, [xAxis, yAxis, searchMfrKey, searchTypeKey]);
  return (
    <>
      <Header />
      <main>
        <section className={styles.section}>
          <h1>chart-js-app</h1>
          <p>シリアルのデータ</p>
          <div className={styles.chartBox}>
            <canvas id="myChart" className={styles.canvas}></canvas>
          </div>
        </section>
        <h4 className={styles.axisContext}>X軸、Y軸について</h4>
        {/* X軸 */}
        <Axis
          setAxisVal={setXAxis}
          axisType={'X'}
          notSelectedAxisVal={yAxis}
        />
        {/* Y軸 */}
        <Axis
          setAxisVal={setYAxis}
          axisType={'Y'}
          notSelectedAxisVal={xAxis}
        />
        <h4 className={styles.SearchContext}>グラフに表示するデータの絞り込み</h4>
        <Search
          setSearchMfrKey={setSearchMfrKey}
          setSearchTypeKey={setSearchTypeKey}
          uniqMfrArr={props.uniqMfrArr}
          uniqTypeArr={props.uniqTypeArr}
        />
      </main>
    </>
  );
}

// シリアルのデータを取得
export async function getServerSideProps(ctx: { req: { headers: { referer: string, host: string } } }) {
  // データ取得URLの生成
  const protocol = ctx.req.headers.referer?.split('://')[0] || 'http';
  const url = `${protocol}://${ctx.req.headers.host}`;
  
  const response = await fetch(`${url}/api/cereals`);
	const cereals: cerealType[] = await response.json();

  // 先にfilterで重複排除してからmapで対象キーの値を返す
  const uniqMfrArr: string[] = cereals.filter((el: cerealType, ind: number, self: cerealType[]) => {
    return self.findIndex((e) => e.mfr === el.mfr) === ind
  }).map(cereal => cereal['mfr']);

  const uniqTypeArr: string[] = cereals.filter((el: cerealType, ind: number, self: cerealType[]) => {
    return self.findIndex((e) => e.type === el.type) === ind
  }).map(cereal => cereal['type']);
  
  return {
    props: { cereals, uniqMfrArr, uniqTypeArr },
  };
}
