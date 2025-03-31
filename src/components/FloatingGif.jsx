import React, { useState, useEffect } from 'react';
import './FloatingGif.css'; // Подключаем CSS-файл

const FloatingGif = () => {
  // Состояние для текущего GIF
  const [currentGif, setCurrentGif] = useState(1);
  
  // Состояние для координат и направления
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [vx, setVx] = useState(4); // Горизонтальная скорость (увеличена для ускорения)
  const [vy, setVy] = useState(4); // Вертикальная скорость (увеличена для ускорения)

  // Функция для выбора случайной гифки
  const getRandomGif = () => {
    return Math.floor(Math.random() * 19) + 1;
  };

  // Функция для движения GIF
  useEffect(() => {
    const intervalId = setInterval(() => {
      const newX = x + vx;
      const newY = y + vy;

      // Проверка на столкновение с краями экрана
      if (newX + 120 > window.innerWidth || newX < 0) {
        setVx(-vx); // Меняем направление по горизонтали
        setCurrentGif(getRandomGif()); // Меняем GIF при столкновении на случайную
      }
      if (newY + 120 > window.innerHeight || newY < 0) {
        setVy(-vy); // Меняем направление по вертикали
        setCurrentGif(getRandomGif()); // Меняем GIF при столкновении на случайную
      }

      setX(newX);
      setY(newY);
    }, 30); // Каждые 30 мс (для ускорения движения)

    return () => clearInterval(intervalId); // Очистка интервала при размонтировании компонента
  }, [x, y, vx, vy]);

  return (
    <div style={{
      position: 'fixed',
      top: `${y}px`,
      left: `${x}px`,
      zIndex: 9999, // Чтобы гифка была поверх всего
    }}>
      <img className="gif"
        src={`/images/gif${currentGif}.gif`} // Динамически выбираем GIF
        alt="Random GIF" 

      />
    </div>
  );
};

export default FloatingGif;
