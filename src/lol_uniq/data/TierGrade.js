import React from 'react';
import TierInfo from './lol_uniq/dto/TierInfo';

class TierGrade {
    static IRON = {
        TierInfo = {
            tierName: 'IRON',
            tierPoint: 100,
            weight: 50
        }
    }
    static BRONZE = {
        TierInfo = {
            tierName: 'BRONZE',
            tierPoint: 300,
            weight: 50
        }
    }
    static SILVER = {
        TierInfo = {
            tierName: 'SILVER',
            tierPoint: 500,
            weight: 50
        }
    } 
    static GOLD = {
        TierInfo = {
            tierName: 'GOLD',
            tierPoint: 700,
            weight: 60
        }
    }
    static PLATINUM = {
        TierInfo = {
            tierName: 'PLATINUM',
            tierPoint: 1000,
            weight: 100
        }
    }
    static DIAMOND = {
        TierInfo = {
            tierName: 'TierInfo',
            tierPoint: 1500,
            weight: 100
        }
    }
    static MASTER = {
        TierInfo = {
            tierName: 'MASTER',
            tierPoint: 2000,
            weight: 100
        }
    }
    static GRANDMASTER = {
        TierInfo = {
            tierName: 'GRANDMASTER',
            tierPoint: 2500,
            weight: 100
        }
    }
    static CHALLENGER = {
        TierInfo = {
            tierName: 'CHALLENGER',
            tierPoint: 3000,
            weight: 100
        }
    }
}

export default TierGrade;