// Firebase SDK 라이브러리 가져오기
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js';
import { getFirestore } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js';
import {
  collection,
  addDoc,
} from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js';
import { getDocs } from 'https://www.gstatic.com/firebasejs/9.22.0/firebase-firestore.js';

// Firebase 구성 정보 설정
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyApEXrgP_4-4gERrJXvPGiK3cxpmJt53HM',
  authDomain: 'spartapractice-d03b5.firebaseapp.com',
  projectId: 'spartapractice-d03b5',
  storageBucket: 'spartapractice-d03b5.appspot.com',
  messagingSenderId: '1062431436998',
  appId: '1:1062431436998:web:6659bcbfc0fb66d504a7c7',
  measurementId: 'G-KND2WRD5KV',
};

// Firebase 인스턴스 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

$('#postingbtn').click(async function () {
  let image = $('#image').val();
  let title = $('#title').val();
  let star = $('#star').val();
  let comment = $('#comment').val();
  let doc = {
    'image': image,
    'title': title,
    'star': star,
    'comment': comment,
  };
  await addDoc(collection(db, 'movies'), doc);
  alert('저장 완료!');
  window.location.reload();
});

$('#record').click(async function () {
  $('#postingbox').toggle();
});

let docs = await getDocs(collection(db, 'movies'));
docs.forEach((doc) => {
  let row = doc.data();
  let image = row['image'];
  let title = row['title'];
  let comment = row['comment'];
  let star = row['star'];
  
  let temp_html = `
  <div class="col">
  <div class="card h-100">
    <img
      src="${image}"
      class="card-img-top"
      alt="..."
    />
    <div class="card-body">
      <h5 class="card-title">${title}</h5>
      <p class="card-text">${star}</p>
      <p class="card-text">${comment}</p>
    </div>
  </div>
</div>`;
  $('#card').append(temp_html);
});

let url = 'http://spartacodingclub.shop/sparta_api/weather/seoul';
fetch(url)
  .then((res) => res.json())
  .then((data) => {
    let temp = data['temp'];
    $('#temperature').text(temp);
  });
