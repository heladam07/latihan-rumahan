export type Gender = 'male' | 'female';

export type MuscleGroup = 'arms' | 'abs' | 'legs';

export interface Exercise {
  id: string;
  name: string;
  duration: number; // in seconds
  reps?: number;
  image: string;
  description: string;
}

export interface WorkoutPlan {
  id: MuscleGroup;
  title: string;
  exercises: Exercise[];
}

export const WORKOUT_PLANS: Record<MuscleGroup, WorkoutPlan> = {
  arms: {
    id: 'arms',
    title: 'Latihan Lengan',
    exercises: [
      {
        id: 'a1',
        name: 'Push Ups',
        duration: 60,
        reps: 15,
        image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJ6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/3o7TKu6WJXTZvbqKv6/giphy.gif',
        description: 'Posisikan tangan sedikit lebih lebar dari bahu. Turunkan tubuh hingga dada hampir menyentuh lantai, lalu dorong kembali ke atas. Jaga punggung tetap lurus dan inti tubuh tetap kencang.'
      },
      {
        id: 'a2',
        name: 'Tricep Dips',
        duration: 60,
        reps: 12,
        image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJ6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/3o7TKp7v6v6v6v6v6v/giphy.gif',
        description: 'Duduk di tepi kursi dengan tangan di samping pinggul. Geser pinggul ke depan dan turunkan tubuh dengan menekuk siku hingga sembilan puluh derajat, lalu dorong kembali ke atas.'
      },
      {
        id: 'a3',
        name: 'Diamond Push Ups',
        duration: 60,
        reps: 10,
        image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJ6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/3o7TKp7v6v6v6v6v6v/giphy.gif',
        description: 'Letakkan tangan di bawah dada dengan ibu jari dan telunjuk membentuk berlian. Turunkan tubuh dan dorong kembali ke atas untuk melatih otot trisep secara maksimal.'
      }
    ]
  },
  abs: {
    id: 'abs',
    title: 'Latihan Perut',
    exercises: [
      {
        id: 'b1',
        name: 'Crunches',
        duration: 60,
        reps: 20,
        image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJ6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/3o7TKp7v6v6v6v6v6v/giphy.gif',
        description: 'Berbaring telentang dengan lutut ditekuk. Angkat bahu perlahan dari lantai menggunakan otot perut, lalu turunkan kembali. Jangan menarik leher Anda dengan tangan.'
      },
      {
        id: 'b2',
        name: 'Plank',
        duration: 60,
        image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJ6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/3o7TKp7v6v6v6v6v6v/giphy.gif',
        description: 'Tahan tubuh dalam garis lurus dari kepala hingga tumit dengan bertumpu pada lengan bawah dan jari kaki. Kencangkan otot perut dan jangan biarkan pinggul turun.'
      },
      {
        id: 'b3',
        name: 'Leg Raises',
        duration: 60,
        reps: 15,
        image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJ6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/3o7TKp7v6v6v6v6v6v/giphy.gif',
        description: 'Berbaring telentang dan angkat kaki lurus ke atas hingga membentuk sudut sembilan puluh derajat. Turunkan kaki perlahan tanpa menyentuh lantai untuk hasil maksimal.'
      }
    ]
  },
  legs: {
    id: 'legs',
    title: 'Latihan Kaki',
    exercises: [
      {
        id: 'c1',
        name: 'Squats',
        duration: 60,
        reps: 20,
        image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJ6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/3o7TKp7v6v6v6v6v6v/giphy.gif',
        description: 'Berdiri dengan kaki selebar bahu. Turunkan pinggul seolah ingin duduk di kursi, jaga dada tetap tegak dan lutut tidak melewati ujung jari kaki.'
      },
      {
        id: 'c2',
        name: 'Lunges',
        duration: 60,
        reps: 12,
        image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJ6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/3o7TKp7v6v6v6v6v6v/giphy.gif',
        description: 'Langkahkan satu kaki ke depan dan turunkan pinggul hingga kedua lutut membentuk sudut sembilan puluh derajat. Pastikan lutut depan tetap sejajar dengan pergelangan kaki.'
      },
      {
        id: 'c3',
        name: 'Calf Raises',
        duration: 60,
        reps: 25,
        image: 'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNHJ6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6Z3R6JmVwPXYxX2ludGVybmFsX2dpZl9ieV9pZCZjdD1n/3o7TKp7v6v6v6v6v6v/giphy.gif',
        description: 'Berdiri tegak dan angkat tumit setinggi mungkin dengan bertumpu pada ujung jari kaki. Tahan sejenak di puncak gerakan lalu turunkan perlahan.'
      }
    ]
  }
};
