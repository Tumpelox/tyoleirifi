type Brand<K, T> = K & { __brand: T };

type UUID = Brand<string, "uuid">;

export interface Player {
  uuid: UUID;
  op: boolean;
  lastJoinDate: string;
  lastPlayDate: string;
  currentStreak: number;
  longestStreak: number;
  playTime: number;
  name: string;
}

export interface PlayerProfile extends Player {
  skin: string | null;
  cape: string | null;
}

export interface PlayerData {
  uuid: UUID;
  key: string;
  value: number;
}

export interface PlaytimeLog {
  uuid: string;
  startTime: number;
  endTime: number;
}
