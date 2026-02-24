
import { Exercise, ExerciseType } from '../types';
import { UNIT_VOCABULARY, generateNumbers } from '../data/vocabulary';

class QuestionBankService {
  private seenIds: Set<string> = new Set();
  private lastSessionIds: Set<string> = new Set();
  private bank: Record<string, Exercise[]> = {};

  constructor() {
    this.loadState();
    this.initializeBank();
  }

  private loadState() {
    const savedSeen = localStorage.getItem('hanzigo_seen_exercises');
    if (savedSeen) {
      try {
        this.seenIds = new Set(JSON.parse(savedSeen));
      } catch (e) {
        this.seenIds = new Set();
      }
    }

    const savedLast = localStorage.getItem('hanzigo_last_session_ids');
    if (savedLast) {
      try {
        this.lastSessionIds = new Set(JSON.parse(savedLast));
      } catch (e) {
        this.lastSessionIds = new Set();
      }
    }
  }

  private saveState() {
    localStorage.setItem('hanzigo_seen_exercises', JSON.stringify(Array.from(this.seenIds)));
    localStorage.setItem('hanzigo_last_session_ids', JSON.stringify(Array.from(this.lastSessionIds)));
  }

  private initializeBank() {
    const units = ['u1', 'u2', 'u3', 'u4', 'u5', 'u6', 'u7', 'u8', 'u9'];
    
    units.forEach(unitId => {
      let vocab = UNIT_VOCABULARY[unitId] || [];
      if (unitId === 'u8') {
        vocab = generateNumbers();
      }
      this.bank[unitId] = this.generateExercises(unitId, vocab, 1000);
    });
  }

  private generateExercises(unitId: string, vocab: any[], targetCount: number): Exercise[] {
    const exercises: Exercise[] = [];
    const types: ExerciseType[] = ['SELECT', 'READ', 'LISTEN', 'SPEAK', 'WRITE'];
    
    if (vocab.length === 0) return [];

    for (let i = 0; i < targetCount; i++) {
      const vocabIdx = i % vocab.length;
      const vocabItem = vocab[vocabIdx];
      
      // Progression logic: 
      // Higher index i means higher difficulty.
      // We also factor in the exercise type difficulty.
      const typeIdx = i % types.length;
      const type = types[typeIdx];
      
      // Difficulty 1-10
      // Base difficulty from index (1-7) + Type difficulty (0-3)
      const baseDiff = Math.floor((i / targetCount) * 7) + 1;
      const typeDiff = Math.floor((typeIdx / types.length) * 3);
      const difficulty = Math.min(10, baseDiff + typeDiff);
      
      const id = `${unitId}_q${i}`;
      
      let options: string[] = [];
      if (type === 'SELECT' || type === 'LISTEN' || type === 'READ') {
        const otherOptions = vocab
          .filter(v => v.simplified !== vocabItem.simplified)
          .sort(() => 0.5 - Math.random())
          .slice(0, 3)
          .map(v => (type === 'READ' ? v.meaning : v.simplified));
        
        const correctOpt = type === 'READ' ? vocabItem.meaning : vocabItem.simplified;
        options = [...otherOptions, correctOpt].sort(() => 0.5 - Math.random());
      }

      const exercise: Exercise = {
        id,
        type,
        question: `q${type.charAt(0) + type.slice(1).toLowerCase()}`,
        chinese: vocabItem.simplified,
        pinyin: vocabItem.pinyin,
        answer: type === 'READ' ? vocabItem.meaning : vocabItem.simplified,
        options: options.length > 0 ? options : undefined,
        difficulty,
        meaning: vocabItem.meaning
      };
      
      exercises.push(exercise);
    }
    
    return exercises;
  }

  private getQuestionTemplate(type: ExerciseType, item: any): string {
    return `q${type.charAt(0) + type.slice(1).toLowerCase()}`;
  }

  public getSessionExercises(unitId: string, count: number = 10, completion: number = 0): Exercise[] {
    const pool = this.bank[unitId] || [];
    if (pool.length === 0) return [];

    // Progression selection:
    // If completion is 0, target difficulty 1-3.
    // If completion is 100, target difficulty 8-10.
    const targetDifficulty = Math.floor((completion / 100) * 7) + 2; // Range 2 to 9
    const minDiff = Math.max(1, targetDifficulty - 2);
    const maxDiff = Math.min(10, targetDifficulty + 2);

    const difficultyPool = pool.filter(ex => ex.difficulty >= minDiff && ex.difficulty <= maxDiff);
    const finalPool = difficultyPool.length >= count ? difficultyPool : pool;

    // Ensure balance of types
    const types: ExerciseType[] = ['SELECT', 'READ', 'LISTEN', 'SPEAK', 'WRITE'];
    const session: Exercise[] = [];
    
    // Try to pick 2 of each type
    types.forEach(type => {
      const typePool = finalPool.filter(ex => ex.type === type && !this.lastSessionIds.has(ex.id));
      const countPerType = Math.floor(count / types.length);
      const selected = typePool.sort(() => 0.5 - Math.random()).slice(0, countPerType);
      session.push(...selected);
    });

    // Fill remaining if any
    if (session.length < count) {
      const remaining = finalPool
        .filter(ex => !session.find(s => s.id === ex.id) && !this.lastSessionIds.has(ex.id))
        .sort(() => 0.5 - Math.random())
        .slice(0, count - session.length);
      session.push(...remaining);
    }

    // 5. Combine and shuffle
    const shuffledSession = session.sort(() => 0.5 - Math.random());

    // 6. Update state
    this.lastSessionIds = new Set(shuffledSession.map(ex => ex.id));
    shuffledSession.forEach(ex => this.seenIds.add(ex.id));
    this.saveState();

    return shuffledSession;
  }
}

export const questionBankService = new QuestionBankService();
