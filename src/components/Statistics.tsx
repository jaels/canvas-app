import React, { useEffect, useState } from 'react';
import { canvasState } from '../canvasReducer';
import { useSelector } from 'react-redux';
import { PieChart, Pie, Cell } from 'recharts';

import '../canvas.scss';

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
    }
  }, []);

  return (
    <div className='statisticsWrapper'>
      <h3>
        {colorArray.length
          ? 'Color usage in your drawing*'
          : 'Sorry, no data, please draw something'}
      </h3>
      {colorArray.length > 0 && (
        <>
          <PieChart width={300} height={300}>
            <Pie
              data={pieData}
              outerRadius={130}
              fill='#8884d8'
              dataKey='value'
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${entry.name}`} fill={colorArray[index]} />
              ))}
            </Pie>
          </PieChart>
          <p>*Doesn't include colors from a loaded image</p>
        </>
      )}
    </div>
  );
};

export default Statistics;
