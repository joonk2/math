let angleSlider; // 슬라이더 변수 선언

function setup() {
  let canvas = createCanvas(600, 400); // 캔버스 크기 지정
  canvas.parent('container');
  angleSlider = createSlider(0, TWO_PI, 0, 0.01); // 슬라이더 생성
}

function draw() {
  background(0); // 검은 배경 설정
  translate(width / 2, height / 2);

  // x축과 y축 그리기
  stroke(255); // 흰색 선
  line(-width / 2, 0, width / 2, 0); // x축
  line(0, -height / 2, 0, height / 2); // y축

  let angle = angleSlider.value();
  let xVector = createVector(100, 0); // x 벡터
  let gamma = 2; // 스칼라 배

  // x 벡터 그리기 (원형으로 회전)
  let rotatedXVector = p5.Vector.fromAngle(angle).mult(xVector.mag());
  stroke(255, 0, 255); // 분홍색
  drawVector(createVector(0, 0), rotatedXVector, 'X');

  // gamma*x 벡터 그리기 (타원형으로 회전)
  let rotatedGammaXVector = p5.Vector.fromAngle(angle).mult(gamma * xVector.mag());
  if (angle >= 0 && angle <= PI) { // 양의 x 축 범위
    rotatedGammaXVector.setMag(map(angle, 0, PI, rotatedXVector.mag() * gamma, rotatedXVector.mag())); // x 벡터의 길이에 따라 gamma 값을 변경하여 설정
  } else { // 음의 x 축 범위
    rotatedGammaXVector.setMag(rotatedXVector.mag()); // x 벡터의 길이 그대로 유지
  }
  rotatedGammaXVector.rotate(angle); // 각도에 따라 회전
  stroke(0, 0, 255); // 파란색
  drawVector(createVector(0, 0), rotatedGammaXVector, 'γX');

  // 회전하는 점 그리기
  let rotatingPointX = cos(angle) * 100; // 각도에 따라 x 위치 계산
  let rotatingPointY = sin(angle) * 100; // 각도에 따라 y 위치 계산
  fill(255, 0, 255); // 분홍색으로 색상 설정
  stroke(255, 0, 255); // 분홍색 선색 설정
  ellipse(rotatingPointX, rotatingPointY, 10); // 회전하는 점 그리기

  // 하단 레이블 그리기 (텍스트 색상을 흰색으로 변경)
  fill(255); // 흰색 텍스트
  textAlign(RIGHT, BOTTOM); // 하단 정렬
  textSize(12);
  text("joonhwan.K", width / 2 - 10, height / 2 - 20); // 하단 레이블 그리기
}

function drawVector(origin, vector, label) {
  let arrowSize = 10;
  let baseX = origin.x;
  let baseY = origin.y;
  let tipX = origin.x + vector.x; // 벡터의 끝점 x 계산
  let tipY = origin.y + vector.y; // 벡터의 끝점 y 계산

  // 화살표 그리기
  let angle = atan2(vector.y, vector.x);
  push();
  translate(tipX, tipY);
  rotate(angle + HALF_PI); // 방향을 앞으로 변경
  fill(255); // 흰색 화살표
  triangle(-arrowSize / 2, arrowSize, arrowSize / 2, arrowSize, 0, -arrowSize / 2);
  pop();

  // 선 그리기
  strokeWeight(2); // 선 두께
  if (label === 'X') {
    stroke(255, 0, 255); // 분홍색
  } else {
    stroke(0, 0, 255); // 파란색
  }
  line(baseX, baseY, tipX, tipY);

  // 레이블 그리기
  noStroke();
  fill(255); // 흰색 텍스트
  textAlign(RIGHT); // 레이블을 오른쪽으로 정렬
  textSize(12);
  text(label, (baseX + tipX) / 2 - 10, (baseY + tipY) / 2); // 벡터의 중점에서 좌측으로 10만큼 이동하여 레이블 그리기
}
