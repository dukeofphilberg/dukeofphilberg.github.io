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
    "x": "LOOT LIST/HIGH",
    "s": "ROLL MS",
    "b": "ROLL OS",
    "m": "LOW",
    "l": "STANDARD"
};

const BIDS = {
    0: "ROLL MS/ROLL OS",
    50: "LOW",
    150: "STANDARD",
    300: "LOOT LIST/HIGH"
};

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
    let output = [];

    JSON.parse(textarea.value)["lootHistory"]["roster"][0]["lootHistory"]["item"].forEach(item => {
        let date = new Date(item.timestamp * 1000);
        let bid = "UNKNOWN";

        try {
            bid = item.auctionInfo.names[item.player];
        } catch {
            bid = BIDS[item.points];
        }

        output.push(`${item.player}\t${date.toLocaleDateString()}\t${item.name}\t${bid}`);
    });

    textarea.value = output.join("\n");
}