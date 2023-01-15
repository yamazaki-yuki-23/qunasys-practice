import React, { useState } from 'react';
import Chart from 'chart.js/auto';
import Header from 'src/components/header';
import Axis from 'src/components/axis';
import { cerealType } from 'src/type/cereal.type';
import { axisType } from 'src/type/axis.type';
import styles from './index.module.css';

export default function Home(props: { cereals: cerealType[] }) {
  // 初期値にはX軸、Y軸で固定値をセット
	const [xAxis, setXAxis] = useState<axisType>('calories');
	const [yAxis, setYAxis] = useState<axisType>('protein');

  React.useEffect(() => {
    let myChart: Chart;
    const cereals = props.cereals.map((cereal: cerealType) => {
      return { x: cereal[xAxis], y: cereal[yAxis] };
    });
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
  }, [xAxis, yAxis]);
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
      </main>
    </>
  );
}

// シリアルのデータを取得
export async function getServerSideProps() {
  const response = await fetch('http://localhost:3000/api/cereals');
	const cereals: cerealType[] = await response.json();
  return {
    props: { cereals },
  };
}
