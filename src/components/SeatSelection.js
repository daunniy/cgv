import React, { useState } from 'react';  // useState를 import
import { useLocation } from 'react-router-dom';  // location을 통해 전달된 state를 받기 위해 import
import './SeatSelection.scss';


// 좌석 배열 생성
const totalSeats = 200;
const rows = 10; // 10개의 행
const columns = 20; // 20개의 열

// 좌석 배열 생성
const seats = Array.from({ length: totalSeats }, (_, index) => {
  const row = Math.floor(index / columns);
  const column = index % columns;
  const rowLabel = String.fromCharCode(65 + row); // A부터 F까지
  return {
    id: index,
    rowLabel,
    column: column + 1, // 1부터 시작
    booked: false
  };
});

const SeatSelection = () => {
  // 인원 유형별로 선택된 좌석 관리
  const [generalSeats, setGeneralSeats] = useState([]); // 배열로 초기화
  const [youthSeats, setYouthSeats] = useState([]); // 배열로 초기화
  const [seniorSeats, setSeniorSeats] = useState([]); // 배열로 초기화
  const [preferentialSeats, setPreferentialSeats] = useState([]); // 배열로 초기화

  // 선택된 인원 수
  const [selectedPersonCount, setSelectedPersonCount] = useState(1);

  // 각 인원 유형별 최대 좌석 수
  const maxSeatsPerType = 8;

  const ticketPrice = 10000; // 예시 가격

  // 좌석 선택 처리 함수
  const toggleSeat = (id, type) => {
    let updatedSeats;
    const totalSelectedSeats = generalSeats.length + youthSeats.length + seniorSeats.length + preferentialSeats.length;

    // 전체 선택된 좌석 수가 8을 넘지 않도록 처리
    if (totalSelectedSeats >= 8) {
      alert('총 8명 이하로 선택할 수 있습니다.');
      return;  // 8명 이상 선택하면 아무 작업도 하지 않음
    }

    // 해당 유형에 따라 선택/해제 처리
    switch (type) {
      case 'general':
        updatedSeats = generalSeats.includes(id) 
          ? generalSeats.filter(seat => seat !== id)
          : [...generalSeats, id];
        if (updatedSeats.length <= maxSeatsPerType) setGeneralSeats(updatedSeats);
        break;

      case 'youth':
        updatedSeats = youthSeats.includes(id) 
          ? youthSeats.filter(seat => seat !== id)
          : [...youthSeats, id];
        if (updatedSeats.length <= maxSeatsPerType) setYouthSeats(updatedSeats);
        break;

      case 'senior':
        updatedSeats = seniorSeats.includes(id) 
          ? seniorSeats.filter(seat => seat !== id)
          : [...seniorSeats, id];
        if (updatedSeats.length <= maxSeatsPerType) setSeniorSeats(updatedSeats);
        break;

      case 'preferential':
        updatedSeats = preferentialSeats.includes(id) 
          ? preferentialSeats.filter(seat => seat !== id)
          : [...preferentialSeats, id];
        if (updatedSeats.length <= maxSeatsPerType) setPreferentialSeats(updatedSeats);
        break;

      default:
        break;
    }
  };

  // 총 가격 계산
  const totalSeatsCount = generalSeats.length + youthSeats.length + seniorSeats.length + preferentialSeats.length;
  const totalPrice = totalSeatsCount * ticketPrice;

  return (
    <div className="reservation">
      <h1><a href="#"><img src="/cgv_logo.svg" alt="" /></a></h1>

      <div>
        <h2>인원</h2>
        <ul className="type">
          <li
            data-count="1"
            onClick={() => setSelectedPersonCount(1)}
            style={{ cursor: 'pointer', padding: '5px', backgroundColor: selectedPersonCount === 1 ? 'lightblue' : '' }}
          >
            일반
          </li>
          <li
            data-count="2"
            onClick={() => setSelectedPersonCount(2)}
            style={{ cursor: 'pointer', padding: '5px', backgroundColor: selectedPersonCount === 2 ? 'lightblue' : '' }}
          >
            청소년
          </li>
          <li
            data-count="3"
            onClick={() => setSelectedPersonCount(3)}
            style={{ cursor: 'pointer', padding: '5px', backgroundColor: selectedPersonCount === 3 ? 'lightblue' : '' }}
          >
            경로
          </li>
          <li
            data-count="4"
            onClick={() => setSelectedPersonCount(4)}
            style={{ cursor: 'pointer', padding: '5px', backgroundColor: selectedPersonCount === 4 ? 'lightblue' : '' }}
          >
            우대
          </li>
        </ul>
      </div>

      <h2>좌석 선택</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', width: '600px' }}>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div key={rowIndex} style={{ display: 'flex', flexDirection: 'row', marginBottom: '4px' }}>
            {/* 각 행에 A~F 라벨 표시 */}
            <div style={{ width: '40px', textAlign: 'center', borderBottom: '1px solid #ccc' }}>
              <span>{String.fromCharCode(65 + rowIndex)}</span>
            </div>
            {/* 각 행에 좌석 번호 1~20 표시 */}
            {Array.from({ length: columns }).map((_, colIndex) => {
              const seatId = rowIndex * columns + colIndex;
              const isGeneral = generalSeats.includes(seatId);
              const isYouth = youthSeats.includes(seatId);
              const isSenior = seniorSeats.includes(seatId);
              const isPreferential = preferentialSeats.includes(seatId);

              return (
                <div
                  key={seatId}
                  onClick={() => {
                    // 선택한 인원 수에 맞는 좌석을 선택하게 하기
                    if (selectedPersonCount === 1) {
                      toggleSeat(seatId, 'general');
                    } else if (selectedPersonCount === 2) {
                      toggleSeat(seatId, 'youth');
                    } else if (selectedPersonCount === 3) {
                      toggleSeat(seatId, 'senior');
                    } else if (selectedPersonCount === 4) {
                      toggleSeat(seatId, 'preferential');
                    }
                  }}
                  style={{
                    width: '20px',
                    height: '20px',
                    margin: '2px',
                    backgroundColor: isGeneral ? 'green' : isYouth ? 'blue' : isSenior ? 'yellow' : isPreferential ? 'purple' : '#777',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    cursor: 'pointer',
                    color: '#fff',
                  }}
                >
                  {colIndex + 1}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      <h2>가격 종합</h2>
      <p>선택한 좌석 수: {totalSeatsCount}</p>
      <p>총 가격: {totalPrice} 원</p>
    </div>
  );
};

export default SeatSelection;
