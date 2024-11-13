import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // react-router-dom을 사용하여 페이지 이동
import './MovieReservation.scss';

const movies = [
  { id: 1, title: '꽃다발 같은 사랑을 했다' },
  { id: 2, title: '귀를 기울이면' },
  { id: 3, title: '날씨의 아이' },
];

const theaters = {
  1: ['인천', '연수역', '부평'],
  2: ['극장 2A', '극장 2B'],
  3: ['극장 3A', '극장 3B'],
};

const availableDates = {
  '인천': ['2024-11-15', '2024-11-16'],
  '연수역': ['2024-11-15', '2024-11-17'],
  '부평': ['2024-11-15', '2024-11-17'],
  '극장 2A': ['2024-11-18', '2024-11-19'],
  '극장 2B': ['2024-11-18', '2024-11-20'],
  '극장 3A': ['2024-11-21', '2024-11-22'],
  '극장 3B': ['2024-11-21', '2024-11-23'],
};

const availableTimes = {
  '2024-11-15': ['10:00', '14:00', '18:00'],
  '2024-11-16': ['11:00', '15:00', '19:00'],
  '2024-11-17': ['12:00', '16:00', '20:00'],
  '2024-11-18': ['09:00', '13:00', '17:00'],
  '2024-11-19': ['10:30', '14:30', '18:30'],
  '2024-11-20': ['11:30', '15:30', '19:30'],
  '2024-11-21': ['08:00', '12:00', '16:00'],
  '2024-11-22': ['09:30', '13:30', '17:30'],
  '2024-11-23': ['10:00', '14:00', '18:00'],
};

const MovieReservation = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedTheater, setSelectedTheater] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  
  const navigate = useNavigate();  // react-router-dom의 navigate를 사용하여 페이지 이동

  const handleMovieChange = (id) => {
    setSelectedMovie(id);
    setSelectedTheater(null);
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const handleTheaterChange = (theater) => {
    setSelectedTheater(theater);
    setSelectedDate(null);
    setSelectedTime(null);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const handleSubmit = () => {
    if (selectedMovie && selectedTheater && selectedDate && selectedTime) {
      navigate('/seat-selection', {
        state: { selectedMovie, selectedTheater, selectedDate, selectedTime },
      });
    }
  };

  return (
    <div className="reservation">
      <h1>영화 예매</h1>

      <div className="selection-container">
        {/* 영화 선택 */}
        <div className="selection-item">
          <label>영화 선택</label>
          <ul className="selection-list">
            {movies.map((movie, index) => (
              <li
                key={movie.id}
                onClick={() => handleMovieChange(movie.id)}
                className={selectedMovie === movie.id ? 'selected' : ''}
                style={{
                  opacity: 1,
                  transition: `opacity 0.5s ease ${index * 0.2}s`,  // 순차적인 등장
                }}
              >
                {movie.title}
              </li>
            ))}
          </ul>
        </div>

        {/* 극장 선택 */}
        {selectedMovie && (
          <div className="selection-item">
            <label>극장 선택</label>
            <ul className="selection-list">
              {theaters[selectedMovie].map((theater, index) => (
                <li
                  key={index}
                  onClick={() => handleTheaterChange(theater)}
                  className={selectedTheater === theater ? 'selected' : ''}
                  style={{
                    opacity: 1,
                    transition: `opacity 0.5s ease ${index * 0.2}s`,  // 순차적인 등장
                  }}
                >
                  {theater}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 날짜 선택 */}
        {selectedTheater && (
          <div className="selection-item">
            <label>날짜 선택</label>
            <ul className="selection-list">
              {availableDates[selectedTheater].map((date, index) => (
                <li
                  key={date}
                  onClick={() => handleDateChange(date)}
                  className={selectedDate === date ? 'selected' : ''}
                  style={{
                    opacity: 1,
                    transition: `opacity 0.5s ease ${index * 0.2}s`,  // 순차적인 등장
                  }}
                >
                  {date}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 시간 선택 */}
        {selectedDate && (
          <div className="selection-item">
            <label>시간 선택</label>
            <ul className="selection-list">
              {availableTimes[selectedDate].map((time, index) => (
                <li
                  key={time}
                  onClick={() => handleTimeChange(time)}
                  className={selectedTime === time ? 'selected' : ''}
                  style={{
                    opacity: 1,
                    transition: `opacity 0.5s ease ${index * 0.2}s`,  // 순차적인 등장
                  }}
                >
                  {time}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 좌석 선택 버튼 */}
        {selectedTime && (
          <button onClick={handleSubmit}>좌석 선택</button>
        )}
      </div>
    </div>
  );
};

export default MovieReservation;
