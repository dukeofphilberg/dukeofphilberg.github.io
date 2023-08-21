const IMPORT_CONFIG = {
    "itemValueMode": 2,
    "allowEqualMax": false,
    "raidCompletionBonusValue": 0,
    "autoAwardOnlineOnly": false,
    "dynamicValue": false,
    "zeroSumBank": false,
    "autoAwardSameZoneOnly": false,
    "minimalIncrement": 1,
    "weeklyReset": 0,
    "onTimeBonus": false,
    "intervalBonusValue": 0,
    "onTimeBonusValue": 0,
    "minimumPoints": -10000,
    "useOS": true,
    "antiSnipe": 0,
    "benchMultiplier": 1,
    "selfBenchSubscribe": false,
    "baseAlways": false,
    "auctionTime": 120,
    "raidCompletionBonus": false,
    "minGP": 1,
    "intervalBonusTime": 0,
    "hardCap": 0,
    "autoAwardIncludeBench": true,
    "allowBelowMinStandings": false,
    "weeklyCap": 0,
    "bossKillBonus": false,
    "intervalBonus": false,
    "allowCancelPass": false,
    "allInAlways": false,
    "zeroSumBankInflation": 0,
    "roundPR": 10,
    "namedButtons": true,
    "bossKillBonusValue": 0,
    "autoBenchLeavers": false,
    "auctionType": 1,
    "rollTime": 20,
    "tax": 0,
    "roundDecimals": 2
};

const FIELD_NAMES = {
    "x": "LL/High",
    "s":"Roll MS",
    "b":"Roll OS",
    "m":"Low",
    "l":"Standard"
}

function doWork() {
    if (document.getElementById("import-tab").classList.contains("active")) {
        doImport();
    } else {
        doExport();
    }

    return true;
}

function doImport() {
    let textarea = document.getElementById("import-dkp-textarea");
    let players = [];

    textarea.value.split("\n").forEach(player => {
        [pName, pClass, pRole, pDkp] = player.split("\t");
        players.push({
            role: "DAMAGER",
            name: pName,
            guid: pName,
            spent: 0,
            class: pClass,
            points: pDkp,
            spec: "0/0/0"
        });
    });

    textarea.value = JSON.stringify({
        standings: {
            roster: [{
                    uid: 1662751134,
                    name: "Hardcore",
                    fieldNames: FIELD_NAMES,
                    standings: {
                        player: players
                    },
                    config: IMPORT_CONFIG
                }
            ]
        }
    });
}

function doExport() {
    let textarea = document.getElementById("export-loot-textarea");
}