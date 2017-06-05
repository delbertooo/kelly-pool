export declare type Ball = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;
export declare type Id = string;
export declare type GameMode = 'LOBBY' | 'RUNNING' | 'OVER';

export class GameView {
    _id: Id;
    otherPlayers: PlayerInGameView[];
    me: PlayerInGameView;
    mode: GameMode;

    static copy(src: GameView): GameView {
        const r = Object.assign(new GameView(), src);
        r.otherPlayers = src.otherPlayers.map(p => PlayerInGameView.copy(p));
        r.me = PlayerInGameView.copy(src.me);
        return r;
    }
}

export class PlayerInGameView {
    name: string;
    wins: number;
    currentBall: Ball;

    static copy(src: PlayerInGameView): PlayerInGameView {
        return Object.assign(new PlayerInGameView(), src);
    }
}

class PlayerInGame {
    playerId: Id;
    wins: number;
    currentBall: Ball;
    //recentBalls: Ball[];
}

class Game {
    _id: Id;
    remainingBalls: Ball[];
    players: PlayerInGame[];
    mode: GameMode;
}

export class PlayerView {
    _id: Id;
    name: string;
    activeGame: Id;
    watchedGames: GameCompactView[];
    //activeGames: GameView[];
    static copy(src: PlayerView): PlayerView {
        const r = Object.assign(new PlayerView(), src);
        r.watchedGames = (src.watchedGames || []).map(g => GameCompactView.copy(g));
        return r;
    }
}

class GameCompactView {
    _id: Id;
    playerNames: string[];
    static copy(src: GameCompactView): GameCompactView {
        const r = Object.assign(new GameCompactView(), src);
        r.playerNames = src.playerNames.slice();
        return r;
    }
}

export class Player {
    _id: Id;
    name: string;
    activeGame: Id;
    watchedGames: Id[];
    //activeGames: ActiveGame[];
}

/*class ActiveGame {
    _id: Id;
    currentBall: Ball;
    recentBalls: Ball[];
    wins: number;
    otherPlayers: PlayerInGame[];
}*/
