import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/components.scss';

const MovieReservation = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);  // 선택된 지역
  const [selectedTheater, setSelectedTheater] = useState(null);  // 선택된 극장
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const [movies, setMovies] = useState([]);  // 영화 목록 상태
  const [regions, setRegions] = useState({}); // 지역 목록 상태
  const [availableDates, setAvailableDates] = useState({}); // 날짜 목록 상태
  const [availableTimes, setAvailableTimes] = useState({}); // 시간 목록 상태

  const navigate = useNavigate();

  // 예시 데이터 로딩
  useEffect(() => {
    setMovies([
      { id: 1, title: '꽃다발 같은 사랑을 했다', rating: '15', poster: '/images/flower.jpeg' },
      { id: 2, title: '귀를 기울이면', rating: '12', poster: '/images/ear.jpg' },
      { id: 3, title: '시간을 달리는 소녀', rating: 'ALL', poster: '/images/time.jpg' },
      { id: 4, title: '타이타닉', rating: '15', poster: '/images/Titanic.webp' },
      { id: 5, title: '너의 이름은', rating: '12', poster: '/images/yourname.webp' },
    ]);
    setRegions({
      서울: [
        '강남', '홍대', '강변', '신촌', '건대', '압구정', '잠실', '사당',
        '여의도', '한남', '구로', '마포', '동대문', '청담'
      ],
      인천: [
        '연수', '계양', '부평', '송도', '작전', '구월', '논현', '남동'
      ],
      부산: [
        '서면', '자갈치', '하단', '센텀시티', '영도', '부산대', '해운대', '광안리', '수영'
      ],
      경기: [
        '수원', '성남', '고양', '용인', '부천', '광명', '안양', '평촌', '안산', '파주'
      ],
      강원: [
        '춘천', '원주', '강릉'
      ],
    });    
    setAvailableDates({
      강남: ['2024-11-18', '2024-11-19', '2024-11-20'],
      홍대: ['2024-11-18', '2024-11-19', '2024-11-20'],
      강변: ['2024-11-18', '2024-11-19'],
      신촌: ['2024-11-19', '2024-11-20'],
      건대: ['2024-11-20'],
      압구정: ['2024-11-18', '2024-11-19'],
      잠실: ['2024-11-18', '2024-11-19', '2024-11-20'],
      사당: ['2024-11-18', '2024-11-19'],
      여의도: ['2024-11-18'],
      한남: ['2024-11-19', '2024-11-20'],
      구로: ['2024-11-18'],
      마포: ['2024-11-20'],
      동대문: ['2024-11-18'],
      청담: ['2024-11-19'],
      
      연수: ['2024-11-18', '2024-11-19', '2024-11-20'],
      계양: ['2024-11-18', '2024-11-19'],
      부평: ['2024-11-19', '2024-11-20'],
      송도: ['2024-11-18', '2024-11-20'],
      작전: ['2024-11-19'],
      구월: ['2024-11-18', '2024-11-19'],
      논현: ['2024-11-20'],
      남동: ['2024-11-19'],
    
      서면: ['2024-11-18', '2024-11-19'],
      자갈치: ['2024-11-19'],
      하단: ['2024-11-18', '2024-11-19'],
      센텀시티: ['2024-11-19', '2024-11-20'],
      영도: ['2024-11-18'],
      부산대: ['2024-11-18', '2024-11-19'],
      해운대: ['2024-11-19', '2024-11-20'],
      광안리: ['2024-11-20'],
      수영: ['2024-11-19'],
    
      수원: ['2024-11-18', '2024-11-19'],
      성남: ['2024-11-19', '2024-11-20'],
      고양: ['2024-11-18', '2024-11-19'],
      용인: ['2024-11-18', '2024-11-19'],
      부천: ['2024-11-19', '2024-11-20'],
      광명: ['2024-11-18', '2024-11-19'],
      안양: ['2024-11-18', '2024-11-19'],
      평촌: ['2024-11-20'],
      안산: ['2024-11-18', '2024-11-19'],
      파주: ['2024-11-20']
    });
    
    setAvailableTimes({
      '2024-11-18': ['10:00', '13:00', '15:30'],
      '2024-11-19': ['11:00', '14:00', '17:00'],
      '2024-11-20': ['12:00', '14:30', '16:00'],
      
      // 인천 지역
      '2024-11-18': ['10:00', '13:00', '15:30'],
      '2024-11-19': ['11:00', '14:00', '17:00'],
      '2024-11-20': ['12:00', '14:30', '16:00'],
    
      // 부산 지역
      '2024-11-18': ['10:00', '13:00', '15:30'],
      '2024-11-19': ['11:00', '14:00', '17:00'],
      '2024-11-20': ['12:00', '14:30', '16:00'],
    
      // 경기 지역
      '2024-11-18': ['10:00', '13:00', '15:30'],
      '2024-11-19': ['11:00', '14:00', '17:00'],
      '2024-11-20': ['12:00', '14:30', '16:00'],
    });
  }, []);

  const handleMovieChange = (movie) => {
    setSelectedMovie(movie);
    setSelectedRegion(null);  // 영화 변경 시 지역 초기화
    setSelectedTheater(null);  // 영화 변경 시 극장 초기화
    setSelectedDate(null);  // 영화 변경 시 날짜 초기화
    setSelectedTime(null);  // 영화 변경 시 시간 초기화
  };

  const handleRegionChange = (region) => {
    setSelectedRegion(region);
    setSelectedTheater(null);  // 지역 선택 시 극장 초기화
    setSelectedDate(null);  // 지역 선택 시 날짜 초기화
    setSelectedTime(null);  // 지역 선택 시 시간 초기화
  };

  const handleTheaterChange = (theater) => {
    setSelectedTheater(theater);
    setSelectedDate(null);  // 극장 선택 시 날짜 초기화
    setSelectedTime(null);  // 극장 선택 시 시간 초기화
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);  // 날짜 선택 시 시간 초기화
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const handleSubmit = () => {
    if (selectedMovie && selectedTheater && selectedDate && selectedTime) {
      navigate('/seat-selection', {
        state: { selectedMovie, selectedTheater, selectedDate, selectedTime },
      });
    } else {
      alert('모든 항목을 선택해 주세요.');
    }
  };

  return (
    <div className="reservation">
      <h1><a href="#"><img src={`${process.env.PUBLIC_URL}/images/cgv_logo.svg`} alt="" /></a></h1>

      <div className="selection-container">
        {/* 영화 선택 */}
        <div className="selection-item">
          <label>영화</label>
          <ul className="selection-list">
            {movies.map((movie, index) => (
              <li
                key={movie.id}
                onClick={() => handleMovieChange(movie)}
                className={selectedMovie?.id === movie.id ? 'selected' : ''}
              >
                <span className={`movie-rating rating-${movie.rating.toLowerCase()}`}>
                  {movie.rating}
                </span>
                {movie.title}
              </li>
            ))}
          </ul>
        </div>

        {/* 지역 선택 */}
        {selectedMovie && (
          <div className="selection-item">
            <label>지역</label>
            <ul className="selection-list">
              {Object.keys(regions).map((region, index) => (
                <li
                  key={index}
                  onClick={() => handleRegionChange(region)}
                  className={selectedRegion === region ? 'selected' : ''}
                >
                  {region}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* 극장 선택 */}
        {selectedRegion && (
          <div className="selection-item">
            <label>극장</label>
            <ul className="selection-list">
              {regions[selectedRegion]?.map((theater, index) => (
                <li
                  key={index}
                  onClick={() => handleTheaterChange(theater)}
                  className={selectedTheater === theater ? 'selected' : ''}
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
            <label>날짜</label>
            <ul className="selection-list">
              {availableDates[selectedTheater]?.map((date, index) => (
                <li
                  key={date}
                  onClick={() => handleDateChange(date)}
                  className={selectedDate === date ? 'selected' : ''}
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
            <label>시간</label>
            <ul className="selection-list">
              {availableTimes[selectedDate]?.map((time, index) => (
                <li
                  key={time}
                  onClick={() => handleTimeChange(time)}
                  className={selectedTime === time ? 'selected' : ''}
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
