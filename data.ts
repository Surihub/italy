import { Category, CultureTip } from './types';

export const categories: Category[] = [
  {
    id: 'greeting',
    title: '기본 인사 & 매너',
    color: 'bg-green-100 text-green-700 border-green-200',
    items: [
      { it: 'Ciao!', kr: '안녕! (가벼운 인사)', pron: '차오!' },
      { it: 'Buongiorno', kr: '안녕하세요 (아침~오후)', pron: '부온조르노' },
      { it: 'Buonasera', kr: '안녕하세요 (저녁)', pron: '부오나세라' },
      { it: 'Arrivederci', kr: '또 만나요 (헤어질 때)', pron: '아리베데르치' },
      { it: 'Grazie mille', kr: '정말 감사합니다', pron: '그라찌에 밀레' },
      { it: 'Prego', kr: '천만에요 / 먼저 하세요', pron: '프레고' },
      { it: 'Per favore', kr: '부탁합니다 (Please)', pron: '페르 파보레' },
      { it: 'Mi scusi', kr: '실례합니다 (질문/길비켜달라고 할 때)', pron: '미 스쿠지' },
      { it: 'Mi dispiace', kr: '미안합니다 (사과)', pron: '미 디스피아체' },
      { it: 'Sì / No', kr: '네 / 아니요', pron: '씨 / 노' },
      { it: 'Non parlo italiano', kr: '이탈리아어 못해요', pron: '논 파를로 이탈리아노' },
      { it: 'Parla inglese?', kr: '영어 할 줄 아세요?', pron: '파를라 잉글레제?' },
      { it: 'Sono coreano/a', kr: '저는 한국 사람입니다', pron: '쏘노 코레아노/나' },
    ]
  },
  {
    id: 'dining',
    title: '식당 & 카페',
    color: 'bg-orange-100 text-orange-700 border-orange-200',
    items: [
      { it: 'Un tavolo per due, per favore', kr: '두 명 자리 부탁해요', pron: '운 타볼로 페르 두에, 페르 파보레' },
      { it: 'Il menu, per favore', kr: '메뉴판 좀 주세요', pron: '일 메누, 페르 파보레' },
      { it: 'Vorrei questo', kr: '이거 주세요 (메뉴 가리키며)', pron: '보레이 퀘스토' },
      { it: 'Acqua naturale', kr: '생수 (탄산 없는 물)', pron: '아꾸아 나투랄레' },
      { it: 'Acqua frizzante', kr: '탄산수', pron: '아꾸아 프리잔떼' },
      { it: 'Un caffè, per favore', kr: '에스프레소 한 잔이요', pron: '운 카페, 페르 파보레' },
      { it: 'Dov\'è il bagno?', kr: '화장실이 어디죠?', pron: '도베 일 바뇨?' },
      { it: 'È delizioso!', kr: '정말 맛있어요!', pron: '에 델리찌오조!' },
      { it: 'Il conto, per favore', kr: '계산서 부탁해요', pron: '일 콘토, 페르 파보레' },
      { it: 'Posso pagare con la carta?', kr: '카드로 계산 되나요?', pron: '포쏘 파가레 콘 라 카르타?' },
      { it: 'Sono allergico a...', kr: '저는 ... 알러지가 있어요', pron: '쏘노 알레르지코 아...' },
      { it: 'Sono vegetariano/a', kr: '저는 채식주의자입니다', pron: '쏘노 베제타리아노/나' },
    ]
  },
  {
    id: 'shopping',
    title: '쇼핑 & 마트',
    color: 'bg-purple-100 text-purple-700 border-purple-200',
    items: [
      { it: 'Quanto costa?', kr: '얼마예요?', pron: '콴토 코스타?' },
      { it: 'Posso provare?', kr: '입어봐도 되나요?', pron: '포쏘 프로바레?' },
      { it: 'Avete una taglia più grande?', kr: '더 큰 사이즈 있나요?', pron: '아베테 우나 탈리아 피우 그란데?' },
      { it: 'Avete una taglia più piccola?', kr: '더 작은 사이즈 있나요?', pron: '아베테 우나 탈리아 피우 피콜라?' },
      { it: 'È troppo caro', kr: '너무 비싸요', pron: '에 트로포 카로' },
      { it: 'Uno sconto, per favore?', kr: '할인 좀 해주세요', pron: '우노 스콘토, 페르 파보레?' },
      { it: 'Solo un\'occhiata, grazie', kr: '그냥 둘러보는 중이에요', pron: '솔로 운 오키아타, 그라찌에' },
      { it: 'Lo prendo', kr: '이거 살게요', pron: '로 프렌도' },
      { it: 'Tax free?', kr: '택스 프리 되나요?', pron: '택스 프리?' },
      { it: 'A che ora chiudete?', kr: '몇 시에 닫나요?', pron: '아 케 오라 키우데테?' },
      { it: 'Posso pagare in contanti?', kr: '현금으로 낼 수 있나요?', pron: '포쏘 파가레 인 콘탄티?' },
    ]
  },
  {
    id: 'transport',
    title: '교통 & 길묻기',
    color: 'bg-blue-100 text-blue-700 border-blue-200',
    items: [
      { it: 'Dove siamo?', kr: '여기가 어디인가요?', pron: '도베 시아모?' },
      { it: 'Dov\'è la stazione?', kr: '기차역이 어디인가요?', pron: '도베 라 스타찌오네?' },
      { it: 'Dov\'è la fermata dell\'autobus?', kr: '버스 정류장이 어디인가요?', pron: '도베 라 페르마타 델 아우토부스?' },
      { it: 'Un biglietto per Roma', kr: '로마행 티켓 한 장이요', pron: '운 빌리에또 페르 로마' },
      { it: 'A destra / A sinistra', kr: '오른쪽으로 / 왼쪽으로', pron: '아 데스트라 / 아 시니스트라' },
      { it: 'Dritto', kr: '직진', pron: '드리또' },
      { it: 'Per favore, mi porti a questo indirizzo', kr: '이 주소로 가주세요 (택시)', pron: '페르 파보레, 미 포르티 아 퀘스토 인디리쪼' },
      { it: 'Aiuto!', kr: '도와주세요!', pron: '아이우토!' },
      { it: 'Chiami la polizia', kr: '경찰을 불러주세요', pron: '키아미 라 폴리찌아' },
      { it: 'Ho perso il passaporto', kr: '여권을 잃어버렸어요', pron: '오 페르소 일 파사포르토' },
    ]
  }
];

export const cultureTips: CultureTip[] = [
  { title: '자릿세 (Coperto)', content: '식당 영수증에 "Coperto"가 있어도 놀라지 마세요. 인당 1~3유로의 자릿세(빵값 포함)입니다. 별도 팁은 필수가 아닙니다.' },
  { title: '커피는 서서 마시기', content: '카페(Bar)에서는 서서 마실 때(al banco)와 앉아서 마실 때(al tavolo) 가격이 다릅니다. 서서 마시는 게 훨씬 저렴해요!' },
  { title: '오후엔 카푸치노 금지?', content: '이탈리아인들은 소화를 위해 식후엔 에스프레소를 마십니다. 우유가 든 카푸치노는 보통 아침에만 마셔요.' },
  { title: '물 주문법', content: '그냥 물(Acqua) 달라고 하면 탄산수(Frizzante)를 줄 수도 있어요. 맹물은 "Naturale"라고 꼭 말하세요.' },
  { title: '기차 티켓 펀칭', content: '지역 열차(Regionale)를 탈 때는 탑승 전 노란색/초록색 기계에 티켓을 넣어 날짜를 찍어야(Convalida) 벌금을 안 냅니다.' },
  { title: '저녁 식사 시간', content: '이탈리아의 저녁 식사는 보통 7시 30분~8시 이후에 시작됩니다. 너무 일찍 가면 문을 안 열었을 수도 있어요.' },
];