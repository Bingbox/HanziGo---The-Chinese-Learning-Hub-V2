
import { Exercise, ExerciseType } from '../types';

export const UNIT_VOCABULARY: Record<string, any[]> = {
  'u1': [ // Pinyin & Basics
    { simplified: '你好', pinyin: 'nǐ hǎo', meaning: 'Hello' },
    { simplified: '谢谢', pinyin: 'xièxie', meaning: 'Thank you' },
    { simplified: '再见', pinyin: 'zàijiàn', meaning: 'Goodbye' },
    { simplified: '对不起', pinyin: 'duìbuqǐ', meaning: 'Sorry' },
    { simplified: '没关系', pinyin: 'méi guānxi', meaning: 'It is okay' },
    { simplified: '老师', pinyin: 'lǎoshī', meaning: 'Teacher' },
    { simplified: '学生', pinyin: 'xuésheng', meaning: 'Student' },
    { simplified: '请', pinyin: 'qǐng', meaning: 'Please' },
    { simplified: '您', pinyin: 'nín', meaning: 'You (polite)' },
    { simplified: '好', pinyin: 'hǎo', meaning: 'Good' },
    { simplified: '不', pinyin: 'bù', meaning: 'No/Not' },
    { simplified: '是', pinyin: 'shì', meaning: 'To be' },
    { simplified: '我', pinyin: 'wǒ', meaning: 'I/Me' },
    { simplified: '你', pinyin: 'nǐ', meaning: 'You' },
    { simplified: '他', pinyin: 'tā', meaning: 'He/Him' },
    { simplified: '她', pinyin: 'tā', meaning: 'She/Her' },
    { simplified: '我们', pinyin: 'wǒmen', meaning: 'We/Us' },
    { simplified: '你们', pinyin: 'nǐmen', meaning: 'You (plural)' },
    { simplified: '他们', pinyin: 'tāmen', meaning: 'They/Them' },
    { simplified: '名字', pinyin: 'míngzi', meaning: 'Name' },
  ],
  'u8': [ // Numbers
    { simplified: '一', pinyin: 'yī', meaning: '1' },
    { simplified: '二', pinyin: 'èr', meaning: '2' },
    { simplified: '三', pinyin: 'sān', meaning: '3' },
    { simplified: '四', pinyin: 'sì', meaning: '4' },
    { simplified: '五', pinyin: 'wǔ', meaning: '5' },
    { simplified: '六', pinyin: 'liù', meaning: '6' },
    { simplified: '七', pinyin: 'qī', meaning: '7' },
    { simplified: '八', pinyin: 'bā', meaning: '8' },
    { simplified: '九', pinyin: 'jiǔ', meaning: '9' },
    { simplified: '十', pinyin: 'shí', meaning: '10' },
  ],
  'u4': [ // Daily Life
    { simplified: '起床', pinyin: 'qǐchuáng', meaning: 'Wake up' },
    { simplified: '睡觉', pinyin: 'shuìjiào', meaning: 'Sleep' },
    { simplified: '吃饭', pinyin: 'chīfàn', meaning: 'Eat' },
    { simplified: '刷牙', pinyin: 'shuāyá', meaning: 'Brush teeth' },
    { simplified: '洗脸', pinyin: 'xǐliǎn', meaning: 'Wash face' },
    { simplified: '上班', pinyin: 'shàngbān', meaning: 'Go to work' },
    { simplified: '下班', pinyin: 'xiàbān', meaning: 'Finish work' },
    { simplified: '回家', pinyin: 'huíjiā', meaning: 'Go home' },
    { simplified: '看电视', pinyin: 'kàn diànshì', meaning: 'Watch TV' },
    { simplified: '做饭', pinyin: 'zuòfàn', meaning: 'Cook' },
    { simplified: '洗澡', pinyin: 'xǐzǎo', meaning: 'Take a shower' },
    { simplified: '运动', pinyin: 'yùndòng', meaning: 'Exercise' },
    { simplified: '看书', pinyin: 'kànshū', meaning: 'Read a book' },
    { simplified: '听音乐', pinyin: 'tīng yīnyuè', meaning: 'Listen to music' },
    { simplified: '打电话', pinyin: 'dǎ diànhuà', meaning: 'Make a phone call' },
    { simplified: '上网', pinyin: 'shàngwǎng', meaning: 'Surf the internet' },
    { simplified: '买菜', pinyin: 'mǎi cài', meaning: 'Buy groceries' },
    { simplified: '洗衣服', pinyin: 'xǐ yīfu', meaning: 'Wash clothes' },
    { simplified: '打扫', pinyin: 'dǎsǎo', meaning: 'Clean up' },
    { simplified: '休息', pinyin: 'xiūxi', meaning: 'Rest' },
  ],
  'u2': [ // Food
    { simplified: '米饭', pinyin: 'mǐfàn', meaning: 'Rice' },
    { simplified: '面条', pinyin: 'miàntiáo', meaning: 'Noodles' },
    { simplified: '包子', pinyin: 'bāozi', meaning: 'Steamed bun' },
    { simplified: '饺子', pinyin: 'jiǎozi', meaning: 'Dumplings' },
    { simplified: '喝水', pinyin: 'hē shuǐ', meaning: 'Drink water' },
    { simplified: '喝茶', pinyin: 'hē chá', meaning: 'Drink tea' },
    { simplified: '咖啡', pinyin: 'kāfēi', meaning: 'Coffee' },
    { simplified: '水果', pinyin: 'shuǐguǒ', meaning: 'Fruit' },
    { simplified: '苹果', pinyin: 'píngguǒ', meaning: 'Apple' },
    { simplified: '香蕉', pinyin: 'xiāngjiāo', meaning: 'Banana' },
    { simplified: '蔬菜', pinyin: 'shūcài', meaning: 'Vegetables' },
    { simplified: '牛肉', pinyin: 'niúròu', meaning: 'Beef' },
    { simplified: '鸡肉', pinyin: 'jīròu', meaning: 'Chicken' },
    { simplified: '鱼', pinyin: 'yú', meaning: 'Fish' },
    { simplified: '鸡蛋', pinyin: 'jīdàn', meaning: 'Egg' },
    { simplified: '牛奶', pinyin: 'niúnǎi', meaning: 'Milk' },
    { simplified: '面包', pinyin: 'miànbāo', meaning: 'Bread' },
    { simplified: '甜点', pinyin: 'tiándiǎn', meaning: 'Dessert' },
    { simplified: '火锅', pinyin: 'huǒguō', meaning: 'Hot pot' },
    { simplified: '炒饭', pinyin: 'chǎofàn', meaning: 'Fried rice' },
  ],
  'u5': [ // Shopping
    { simplified: '买', pinyin: 'mǎi', meaning: 'Buy' },
    { simplified: '卖', pinyin: 'mài', meaning: 'Sell' },
    { simplified: '钱', pinyin: 'qián', meaning: 'Money' },
    { simplified: '多少钱', pinyin: 'duōshǎo qián', meaning: 'How much' },
    { simplified: '太贵了', pinyin: 'tài guì le', meaning: 'Too expensive' },
    { simplified: '便宜', pinyin: 'piányi', meaning: 'Cheap' },
    { simplified: '商店', pinyin: 'shāngdiàn', meaning: 'Store' },
    { simplified: '超市', pinyin: 'chāoshì', meaning: 'Supermarket' },
    { simplified: '衣服', pinyin: 'yīfu', meaning: 'Clothes' },
    { simplified: '鞋子', pinyin: 'xiézi', meaning: 'Shoes' },
    { simplified: '裤子', pinyin: 'kùzi', meaning: 'Pants' },
    { simplified: '打折', pinyin: 'dǎzhé', meaning: 'Discount' },
    { simplified: '刷卡', pinyin: 'shuākǎ', meaning: 'Pay by card' },
    { simplified: '现金', pinyin: 'xiànjīn', meaning: 'Cash' },
    { simplified: '发票', pinyin: 'fāpiào', meaning: 'Invoice' },
    { simplified: '试衣间', pinyin: 'shìyījiān', meaning: 'Fitting room' },
    { simplified: '号', pinyin: 'hào', meaning: 'Size' },
    { simplified: '颜色', pinyin: 'yánsè', meaning: 'Color' },
    { simplified: '黑色', pinyin: 'hēisè', meaning: 'Black' },
    { simplified: '白色', pinyin: 'báisè', meaning: 'White' },
  ],
  'u6': [ // Social
    { simplified: '朋友', pinyin: 'péngyou', meaning: 'Friend' },
    { simplified: '同学', pinyin: 'tóngxué', meaning: 'Classmate' },
    { simplified: '同事', pinyin: 'tóngshì', meaning: 'Colleague' },
    { simplified: '认识', pinyin: 'rènshi', meaning: 'To know' },
    { simplified: '高兴', pinyin: 'gāoxìng', meaning: 'Happy' },
    { simplified: '名字', pinyin: 'míngzi', meaning: 'Name' },
    { simplified: '中国', pinyin: 'zhōngguó', meaning: 'China' },
    { simplified: '美国', pinyin: 'měiguó', meaning: 'USA' },
    { simplified: '英国', pinyin: 'yīngguó', meaning: 'UK' },
    { simplified: '法国', pinyin: 'fǎguó', meaning: 'France' },
    { simplified: '医生', pinyin: 'yīshēng', meaning: 'Doctor' },
    { simplified: '护士', pinyin: 'hùshi', meaning: 'Nurse' },
    { simplified: '警察', pinyin: 'jǐngchá', meaning: 'Police' },
    { simplified: '司机', pinyin: 'sījī', meaning: 'Driver' },
    { simplified: '家人', pinyin: 'jiārén', meaning: 'Family' },
    { simplified: '爸爸', pinyin: 'bàba', meaning: 'Dad' },
    { simplified: '妈妈', pinyin: 'māma', meaning: 'Mom' },
    { simplified: '哥哥', pinyin: 'gēge', meaning: 'Older brother' },
    { simplified: '姐姐', pinyin: 'jiějie', meaning: 'Older sister' },
    { simplified: '弟弟', pinyin: 'dìdi', meaning: 'Younger brother' },
  ],
  'u3': [ // Travel
    { simplified: '去', pinyin: 'qù', meaning: 'Go' },
    { simplified: '来', pinyin: 'lái', meaning: 'Come' },
    { simplified: '北京', pinyin: 'běijīng', meaning: 'Beijing' },
    { simplified: '上海', pinyin: 'shànghǎi', meaning: 'Shanghai' },
    { simplified: '飞机', pinyin: 'fēijī', meaning: 'Airplane' },
    { simplified: '火车站', pinyin: 'huǒchēzhàn', meaning: 'Train station' },
    { simplified: '地铁', pinyin: 'dìtiě', meaning: 'Subway' },
    { simplified: '出租车', pinyin: 'chūzūchē', meaning: 'Taxi' },
    { simplified: '酒店', pinyin: 'jiǔdiàn', meaning: 'Hotel' },
    { simplified: '地图', pinyin: 'dìtú', meaning: 'Map' },
    { simplified: '护照', pinyin: 'hùzhào', meaning: 'Passport' },
    { simplified: '签证', pinyin: 'qiānzhèng', meaning: 'Visa' },
    { simplified: '行李', pinyin: 'xíngli', meaning: 'Luggage' },
    { simplified: '门票', pinyin: 'ménpiào', meaning: 'Ticket' },
    { simplified: '导游', pinyin: 'dǎoyóu', meaning: 'Tour guide' },
    { simplified: '风景', pinyin: 'fēngjǐng', meaning: 'Scenery' },
    { simplified: '拍照', pinyin: 'pāizhào', meaning: 'Take photo' },
    { simplified: '左转', pinyin: 'zuǒzhuǎn', meaning: 'Turn left' },
    { simplified: '右转', pinyin: 'yòuzhuǎn', meaning: 'Turn right' },
    { simplified: '直走', pinyin: 'zhízǒu', meaning: 'Go straight' },
  ],
  'u7': [ // Culture
    { simplified: '春节', pinyin: 'chūnjié', meaning: 'Spring Festival' },
    { simplified: '红包', pinyin: 'hóngbāo', meaning: 'Red envelope' },
    { simplified: '灯笼', pinyin: 'dēnglóng', meaning: 'Lantern' },
    { simplified: '书法', pinyin: 'shūfǎ', meaning: 'Calligraphy' },
    { simplified: '功夫', pinyin: 'gōngfu', meaning: 'Kung Fu' },
    { simplified: '茶道', pinyin: 'chádào', meaning: 'Tea ceremony' },
    { simplified: '京剧', pinyin: 'jīngjù', meaning: 'Peking Opera' },
    { simplified: '中秋节', pinyin: 'zhōngqiūjié', meaning: 'Mid-Autumn Festival' },
    { simplified: '月饼', pinyin: 'yuèbǐng', meaning: 'Mooncake' },
    { simplified: '熊猫', pinyin: 'xióngmāo', meaning: 'Panda' },
    { simplified: '长城', pinyin: 'chángchéng', meaning: 'Great Wall' },
    { simplified: '故宫', pinyin: 'gùgōng', meaning: 'Forbidden City' },
    { simplified: '旗袍', pinyin: 'qípáo', meaning: 'Qipao' },
    { simplified: '饺子', pinyin: 'jiǎozi', meaning: 'Dumplings' },
    { simplified: '筷子', pinyin: 'kuàizi', meaning: 'Chopsticks' },
    { simplified: '太极', pinyin: 'tàijí', meaning: 'Tai Chi' },
    { simplified: '汉字', pinyin: 'hànzì', meaning: 'Chinese characters' },
    { simplified: '唐装', pinyin: 'tángzhuāng', meaning: 'Tang suit' },
    { simplified: '扇子', pinyin: 'shànzi', meaning: 'Fan' },
    { simplified: '剪纸', pinyin: 'jiǎnzhǐ', meaning: 'Paper cutting' },
  ],
  'u9': [ // Business
    { simplified: '公司', pinyin: 'gōngsī', meaning: 'Company' },
    { simplified: '会议', pinyin: 'huìyì', meaning: 'Meeting' },
    { simplified: '名片', pinyin: 'míngpiàn', meaning: 'Business card' },
    { simplified: '合同', pinyin: 'hétong', meaning: 'Contract' },
    { simplified: '面试', pinyin: 'miànshì', meaning: 'Interview' },
    { simplified: '合作', pinyin: 'hézuò', meaning: 'Cooperation' },
    { simplified: '项目', pinyin: 'xiàngmù', meaning: 'Project' },
    { simplified: '工资', pinyin: 'gōngzī', meaning: 'Salary' },
    { simplified: '加班', pinyin: 'jiābān', meaning: 'Overtime' },
    { simplified: '出差', pinyin: 'chūchāi', meaning: 'Business trip' },
    { simplified: '老板', pinyin: 'lǎobǎn', meaning: 'Boss' },
    { simplified: '经理', pinyin: 'jīnglǐ', meaning: 'Manager' },
    { simplified: '客户', pinyin: 'kèhù', meaning: 'Client' },
    { simplified: '报告', pinyin: 'bàogào', meaning: 'Report' },
    { simplified: '邮件', pinyin: 'yóujiàn', meaning: 'Email' },
    { simplified: '电话', pinyin: 'diànhuà', meaning: 'Phone' },
    { simplified: '出差', pinyin: 'chūchāi', meaning: 'Business trip' },
    { simplified: '市场', pinyin: 'shìchǎng', meaning: 'Market' },
    { simplified: '竞争', pinyin: 'jìngzhēng', meaning: 'Competition' },
    { simplified: '成功', pinyin: 'chénggōng', meaning: 'Success' },
  ]
};

export const generateNumbers = () => {
  const nums = [];
  const units = ['', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  const tens = ['', '十', '二十', '三十', '四十', '五十', '六十', '七十', '八十', '九十'];
  
  // 1. Basic numbers 1-10 (Difficulty 1)
  for (let i = 1; i <= 10; i++) {
    let chinese = i === 10 ? '十' : units[i];
    nums.push({ simplified: chinese, pinyin: i.toString(), meaning: i.toString() });
  }

  // 2. Teens 11-20 (Difficulty 2)
  for (let i = 11; i <= 20; i++) {
    let chinese = i === 20 ? '二十' : '十' + units[i % 10];
    nums.push({ simplified: chinese, pinyin: i.toString(), meaning: i.toString() });
  }

  // 3. Tens 21-100 (Difficulty 3-5)
  for (let i = 21; i <= 100; i++) {
    let chinese = '';
    if (i === 100) chinese = '一百';
    else {
      const t = Math.floor(i / 10);
      const u = i % 10;
      chinese = tens[t] + units[u];
    }
    nums.push({ simplified: chinese, pinyin: i.toString(), meaning: i.toString() });
  }

  // 4. Hundreds 101-1000 (Difficulty 6-10)
  // We'll sample these to keep the bank manageable but still large
  for (let i = 101; i <= 1000; i += (i < 500 ? 5 : 10)) {
    let chinese = '';
    if (i === 1000) chinese = '一千';
    else {
      const h = Math.floor(i / 100);
      const t = Math.floor((i % 100) / 10);
      const u = i % 10;
      if (h > 0) chinese += units[h] + '百';
      if (t > 0) {
        chinese += tens[t];
      } else if (h > 0 && u > 0) chinese += '零';
      if (u > 0) {
        chinese += units[u];
      }
    }
    nums.push({ simplified: chinese, pinyin: i.toString(), meaning: i.toString() });
  }
  
  return nums;
};
