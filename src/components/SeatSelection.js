import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../components/components.scss';

const totalSeats = 200;
const rows = 10;
const columns = 20;

const seats = Array.from({ length: totalSeats }, (_, index) => {
  const row = Math.floor(index / columns);
  const column = index % columns;
  const rowLabel = String.fromCharCode(65 + row); 
  return {
    id: index,
    rowLabel,
    column: column + 1,
    booked: false
  };
});

const SeatSelection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedMovie, selectedTheater, selectedDate, selectedTime } = location.state || {};

  const [generalSeats, setGeneralSeats] = useState([]);
  const [youthSeats, setYouthSeats] = useState([]);
  const [seniorSeats, setSeniorSeats] = useState([]);
  const [preferentialSeats, setPreferentialSeats] = useState([]);
  const [selectedPersonCount, setSelectedPersonCount] = useState(1); // 1: 일반, 2: 청소년, 3: 경로, 4: 우대
  const [reservationInfo, setReservationInfo] = useState(null);

  // 가격 설정 (각 좌석 유형별 가격)
  const prices = {
    general: 15000,
    youth: 12000,
    senior: 7000,
    preferential: 5000
  };

  const maxSeatsPerType = 8;

  const toggleSeat = (id, type) => {
    let updatedSeats;
    const totalSelectedSeats = generalSeats.length + youthSeats.length + seniorSeats.length + preferentialSeats.length;

    // 최대 좌석 수를 초과할 경우, 선택을 방지
    if (totalSelectedSeats >= 8 && !isSeatSelected(id, type)) {
      alert('총 8명 이하로 선택할 수 있습니다.');
      return;
    }

    // 좌석 취소/선택 로직
    switch (type) {
      case 'general':
        updatedSeats = isSeatSelected(id, 'general')
          ? generalSeats.filter(seat => seat !== id)
          : [...generalSeats, id];
        setGeneralSeats(updatedSeats);
        break;

      case 'youth':
        updatedSeats = isSeatSelected(id, 'youth')
          ? youthSeats.filter(seat => seat !== id)
          : [...youthSeats, id];
        setYouthSeats(updatedSeats);
        break;

      case 'senior':
        updatedSeats = isSeatSelected(id, 'senior')
          ? seniorSeats.filter(seat => seat !== id)
          : [...seniorSeats, id];
        setSeniorSeats(updatedSeats);
        break;

      case 'preferential':
        updatedSeats = isSeatSelected(id, 'preferential')
          ? preferentialSeats.filter(seat => seat !== id)
          : [...preferentialSeats, id];
        setPreferentialSeats(updatedSeats);
        break;

      default:
        break;
    }
  };

  // 특정 좌석이 선택되어 있는지 확인하는 함수
  const isSeatSelected = (id, type) => {
    switch (type) {
      case 'general': return generalSeats.includes(id);
      case 'youth': return youthSeats.includes(id);
      case 'senior': return seniorSeats.includes(id);
      case 'preferential': return preferentialSeats.includes(id);
      default: return false;
    }
  };

  // 선택된 좌석 수 계산
  const totalSeatsCount = generalSeats.length + youthSeats.length + seniorSeats.length + preferentialSeats.length;

  // 각 유형별로 선택된 좌석에 대한 총 가격 계산
  const totalPrice = 
    generalSeats.length * prices.general + 
    youthSeats.length * prices.youth + 
    seniorSeats.length * prices.senior + 
    preferentialSeats.length * prices.preferential;

  const handleReservation = () => {
    // 예매 확인 창
    const isConfirmed = window.confirm('정말 예매하시겠습니까?');
  
    if (isConfirmed) {
      // 좌석 번호를 "A1, A2, B1" 형식으로 저장
      const selectedSeats = [
        ...generalSeats.map(id => `${seats[id].rowLabel}${seats[id].column}`), // 일반 좌석 번호
        ...youthSeats.map(id => `${seats[id].rowLabel}${seats[id].column}`), // 청소년 좌석 번호
        ...seniorSeats.map(id => `${seats[id].rowLabel}${seats[id].column}`), // 경로 좌석 번호
        ...preferentialSeats.map(id => `${seats[id].rowLabel}${seats[id].column}`) // 우대 좌석 번호
      ];
  
      setReservationInfo({
        movie: selectedMovie?.title,
        theater: selectedTheater,
        date: selectedDate,
        time: selectedTime,
        seats: selectedSeats.join(', '), // 선택된 좌석 번호들을 쉼표로 구분하여 출력
        totalSeats: totalSeatsCount,
        totalPrice: totalPrice,
        // 각 좌석 유형별로 선택된 인원 수 추가
        generalSeatsCount: generalSeats.length,
        youthSeatsCount: youthSeats.length,
        seniorSeatsCount: seniorSeats.length,
        preferentialSeatsCount: preferentialSeats.length
      });
  
      alert('예매가 완료되었습니다!');
    } else {
      alert('예매가 취소되었습니다.');
    }
  };

  return (
    <div className="seatReservation">
      <h1>
        <img src={`${process.env.PUBLIC_URL}/images/cgv_logo.svg`} alt="" />
      </h1>

      {/* 영화 정보 출력 */}
      <div className="selected">
        <ul className="type">
          <li
            data-count="1"
            onClick={() => setSelectedPersonCount(1)}
            style={{ cursor: 'pointer', color: selectedPersonCount === 1 ? '#F22727' : '', backgroundColor: selectedPersonCount === 1 ? '#fff' : '' }}
          >
            일반
          </li>
          <li
            data-count="2"
            onClick={() => setSelectedPersonCount(2)}
            style={{ cursor: 'pointer', color: selectedPersonCount === 2 ? '#ffcc00' : '', backgroundColor: selectedPersonCount === 2 ? '#fff' : '' }}
          >
            청소년
          </li>
          <li
            data-count="3"
            onClick={() => setSelectedPersonCount(3)}
            style={{ cursor: 'pointer', color: selectedPersonCount === 3 ? 'green' : '', backgroundColor: selectedPersonCount === 3 ? '#fff' : '' }}
          >
            경로
          </li>
          <li
            data-count="4"
            onClick={() => setSelectedPersonCount(4)}
            style={{ cursor: 'pointer', color: selectedPersonCount === 4 ? 'purple' : '', backgroundColor: selectedPersonCount === 4 ? '#fff' : '' }}
          >
            우대
          </li>
        </ul>
      </div>

      <div className="seat">
        <div className="seat-wrap" style={{ display: 'flex', flexWrap: 'wrap', width: '520px' }}>
          <p style={{ margin: '20px auto', fontWeight: '600', fontSize: '30px'}}>SCREEN</p>
          {Array.from({ length: rows }).map((_, rowIndex) => (
            <div key={rowIndex} style={{ display: 'flex', flexDirection: 'row', marginBottom: '4px' }}>
              <div className='seat-rows' style={{ width: '40px', textAlign: 'center', borderBottom: '1px solid #ccc', marginRight: '8px' }}>
                <span>{String.fromCharCode(65 + rowIndex)}</span>
              </div>
              {Array.from({ length: columns }).map((_, colIndex) => {
                const seatId = rowIndex * columns + colIndex;
                const isGeneral = isSeatSelected(seatId, 'general');
                const isYouth = isSeatSelected(seatId, 'youth');
                const isSenior = isSeatSelected(seatId, 'senior');
                const isPreferential = isSeatSelected(seatId, 'preferential');

                const isSeatDisabled =
                  (selectedPersonCount === 1 && (isYouth || isSenior || isPreferential)) ||
                  (selectedPersonCount === 2 && (isGeneral || isSenior || isPreferential)) ||
                  (selectedPersonCount === 3 && (isGeneral || isYouth || isPreferential)) ||
                  (selectedPersonCount === 4 && (isGeneral || isYouth || isSenior));

                return (
                  <div className="seat-box"
                    key={seatId}
                    onClick={() => {
                      if (isSeatDisabled) {
                        return; // 다른 유형의 좌석은 선택할 수 없음
                      }
                      // 좌석 선택 / 취소 로직
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
                      color: '#fff',
                      backgroundColor: isGeneral ? '#F22727' : isYouth ? '#ffcc00' : isSenior ? 'green' : isPreferential ? 'purple' : '#595959',
                      fontSize: '12px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      cursor: isSeatDisabled ? 'not-allowed' : 'pointer', // 비활성화된 좌석은 클릭 불가
                      opacity: isSeatDisabled ? 0.5 : 1, // 비활성화된 좌석은 반투명
                      pointerEvents: isSeatDisabled ? 'none' : 'auto' // 선택 불가 좌석은 pointer 이벤트 안받음
                    }}
                  >
                    {colIndex + 1}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {selectedMovie ? (
          <div className="movie-info">
            <h3>{selectedMovie?.title || selectedMovie}</h3>
            <div className="info-wrap">
              <div className="text-wrap">
                <p>{selectedTheater} CGV</p>
                <p>{selectedDate}</p>
                <p>{selectedTime} ~ </p>
              </div>
              <img
                src={selectedMovie?.poster ? `${process.env.PUBLIC_URL}${selectedMovie.poster}` : `${process.env.PUBLIC_URL}/images/default_poster.jpg`}
                alt={selectedMovie?.title}
                style={{ width: '100px', height: '140px', backgroundSize: 'cover' }}
              />
            </div>
            <p>최종결제금액 <sapn style={{color: '#F22727', fontSize: '24px', margin: '0 10px 10px 40px'}}>{totalPrice.toLocaleString()}</sapn> 원</p>
            <div className="button">
              <button onClick={() => navigate(-1)}>영화 선택</button>
              <button onClick={handleReservation}>예매</button>
            </div>
          </div>
        ) : (
          <p>영화 정보가 없습니다.</p>
        )}
      </div>

      {/* 예약 정보 출력 */}
      {reservationInfo && (
        <div className="reservation-summary">
          <h3>예매가 완료 되었습니다.</h3>
          <div className="reservation-details">
            <div>
              <img
                src={selectedMovie?.poster ? `${process.env.PUBLIC_URL}${selectedMovie.poster}` : `${process.env.PUBLIC_URL}/images/default_poster.jpg`}
                alt={selectedMovie?.title}
                style={{ width: '200px', height: '300px', backgroundSize: 'cover', marginRight: '40px' }}
              />
            </div>
            <div>
              <p><strong>예매번호</strong> </p>
              <p><strong>영화</strong> {reservationInfo.movie}</p>
              <p><strong>극장</strong> {reservationInfo.theater} CGV</p>
              <p><strong>일시</strong> {reservationInfo.date} / {reservationInfo.time} ~</p>
              <p><strong>좌석</strong> {reservationInfo.seats}</p>
              <p>
                <strong>인원</strong> {reservationInfo.generalSeatsCount > 0 && `일반 ${reservationInfo.generalSeatsCount}명`} 
                {reservationInfo.youthSeatsCount > 0 && `청소년 ${reservationInfo.youthSeatsCount}명`} 
                {reservationInfo.seniorSeatsCount > 0 && `경로 ${reservationInfo.seniorSeatsCount}명`} 
                {reservationInfo.preferentialSeatsCount > 0 && `우대 ${reservationInfo.preferentialSeatsCount}명`}
              </p>
              <p><strong>결제금액</strong> {reservationInfo.totalPrice.toLocaleString()}원</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SeatSelection;
