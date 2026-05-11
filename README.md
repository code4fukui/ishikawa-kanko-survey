# ishikawa-kanko-survey - 石川県観光データ分析プラットフォーム「Milli」

> 日本語のREADMEはこちらです: [README.ja.md](README.ja.md)

This repository contains the automated data processing pipeline for the Ishikawa Prefecture tourism survey. It fetches raw data from Google Sheets, cleans it, and publishes it as open data CSV files.

## Open Data

The processed survey data is available for three regions and as a combined dataset.

- **All Data:** [all.csv](https://code4fukui.github.io/ishikawa-kanko-survey/all.csv)
- **Kanazawa Area:** [kanazawa.csv](https://code4fukui.github.io/ishikawa-kanko-survey/kanazawa.csv)
- **Kaga Area:** [kaga.csv](https://code4fukui.github.io/ishikawa-kanko-survey/kaga.csv)
- **Noto Area:** [noto.csv](https://code4fukui.github.io/ishikawa-kanko-survey/noto.csv)

## How It Works

A GitHub Actions workflow runs daily at 17:25 UTC to automatically update the datasets.

1.  **Fetch Data:** The `download.js` script fetches the latest survey responses as CSV files from public Google Sheets URLs defined in `list.js`.
2.  **Process & Clean:** The `make.js` script then processes the raw data:
    *   It combines data from all three regions (Kanazawa, Kaga, Noto).
    *   It maps the long, descriptive Japanese column headers to shorter, standardized field names.
    *   It filters out any responses where the user did not consent to the privacy policy.
    *   It sorts the data by timestamp and assigns a unique ID to each entry.
3.  **Publish:** The final, cleaned CSV files (`all.csv`, `kanazawa.csv`, etc.) are committed back to the repository and published via GitHub Pages.

## Data Schema

The final `all.csv` file contains the following columns:

- `ID`: Unique identifier for each response
- `回答エリア`: Response area (金沢, 加賀, 能登)
- `回答日時`: Timestamp of the response
- `宿泊数（全行程）`: Number of nights stayed (entire trip)
- `宿泊数（県内）`: Number of nights stayed (in Ishikawa)
- `宿泊エリア（県内）`: Accommodation area (in Ishikawa)
- `宿泊エリア（県外）`: Accommodation area (outside Ishikawa)
- `同行者`: Travel companions
- `宿泊目的`: Purpose of visit
- `交通手段`: Means of transportation to Ishikawa
- `交通手段（施設）`: Means of transportation to the facility
- `満足度（交通手段）`: Satisfaction with transportation
- `満足度理由（交通手段）`: Reason for transportation satisfaction
- `一人あたり宿泊費`: Accommodation cost per person
- `一人あたり交通費`: Transportation cost per person
- `一人あたり消費額（県内）`: Spending per person (in Ishikawa, excluding accommodation/transport)
- `訪問回数`: Number of previous visits to the facility
- `情報源`: Information source for the visit
- `訪問施設（前）`: Previous place visited
- `訪問施設（前）自由記入`: Previous place visited (free text)
- `訪問施設（後）自由記入`: Next place to visit (free text)
- `一人あたり消費額（施設）`: Spending per person (at the facility)
- `満足度（商品・サービス）`: Satisfaction with products/services
- `満足度理由（商品・サービス）`: Reason for product/service satisfaction
- `満足度（施設）`: Satisfaction with the facility
- `満足度理由（施設）`: Reason for facility satisfaction
- `不便（施設）`: Inconveniences at the facility
- `不便理由`: Reason for inconvenience
- `NPS`: Net Promoter Score (0-10)
- `推薦理由`: Reason for recommendation
- `自由意見（施設）`: Free comments (about the facility)
- `リピート意向`: Intention to revisit Ishikawa
- `自由意見（県内）`: Free comments (about Ishikawa)
- `性別`: Gender
- `生年`: Birth year
- `都道府県`: Prefecture of residence
- `市区町村`: Municipality of residence
- `世帯年収`: Household income
- `回答動機`: Motivation for answering the survey

## Manual Usage

To run the data processing pipeline manually, you need the [Deno](https://deno.land/) runtime.

1.  Clone the repository:
    ```bash
    git clone https://github.com/code4fukui/ishikawa-kanko-survey.git
    cd ishikawa-kanko-survey
    ```
2.  Download the latest raw data from Google Sheets:
    ```bash
    deno run -A download.js
    ```
3.  Process the raw data to generate the final CSV files:
    ```bash
    deno run -A make.js
    ```

## Related Projects

- [Fukui Prefecture Tourism Data Analysis System on GitHub](https://github.com/code4fukui/fukui-kanko-survey/)

## Data Source & License

The open data is provided by the [Ishikawa Prefecture Tourism Strategy Promotion Division, Tourism Planning Division](https://sites.google.com/view/milli-ishikawa-pref/milli%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6).