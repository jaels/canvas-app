import React, { useEffect, useState } from 'react';
import { canvasState } from './canvasReducer';
import { useSelector } from 'react-redux';
import { PieChart, Pie, Cell } from 'recharts';

import './App.scss';

const Statistics: React.FC<{}> = () => {
  const canvasData = useSelector<canvasState, Array<number>>(
    (state) => state.canvasData
  );
  const colorArray = useSelector<canvasState, Array<string>>(
    (state) => state.colorArray
  );

  const [pieData, setPieData] = useState<
    Array<{ name: string; value: number }>
  >([]);

  useEffect(() => {
    let colorObj: any = {};
    const convertRgbToHex = (r: number, g: number, b: number) =>
      '#' +
      [r, g, b]
        .map((x) => {
          const hex = x.toString(16);
          return hex.length === 1 ? '0' + hex : hex;
        })
        .join('');
    console.log(convertRgbToHex(212, 42, 42));
    if (canvasData.length) {
      for (let i = 0; i < canvasData.length; i += 4) {
        if (
          !(
            canvasData[i] === 0 &&
            canvasData[i + 1] === 0 &&
            canvasData[i + 2] === 0 &&
            canvasData[i + 3] === 0
          )
        ) {
          // let hex = convertRgbToHex(
          //   canvasData[i],
          //   canvasData[i + 1],
          //   canvasData[i + 2]
          // );
          // const a =
          //   canvasData[i + 3] < 255
          //     ? Math.round(canvasData[i + 3]).toString(16)
          //     : '';
          // const hexa = `${hex}${a}`;
          // console.log(a);

          let rgb = `rgb(${canvasData[i]},${canvasData[i + 1]},${
            canvasData[i + 2]
          })`;
          if (colorObj[rgb]) {
            colorObj[rgb] += 1;
          } else {
            colorObj[rgb] = 1;
          }
        }
      }
      const data = colorArray.map((col) => {
        return {
          name: col,
          value: colorObj[col],
        };
      });
      setPieData(data);
      console.log(colorObj);
      console.log(data);
    }
  }, []);

  return (
    <div className='statisticsWrapper'>
      <h3>Different color usage in your drawing</h3>
      <PieChart width={300} height={300}>
        <Pie
          data={pieData}
          innerRadius={20}
          outerRadius={130}
          fill='#8884d8'
          dataKey='value'
        >
          {pieData.map((entry, index) => (
            <Cell key={`cell-${entry.name}`} fill={colorArray[index]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
};

export default Statistics;
