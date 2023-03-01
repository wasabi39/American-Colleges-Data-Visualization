var vegaLiteSpec = 
{
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "data": {
    "url": "https://raw.githubusercontent.com/wasabi39/test/main/top_colleges_2022.csv"
  },
  "vconcat": [
    {
      "width": 800,
      "height": 300,
      "layer": [
        {
          "data": {
            "url": "https://raw.githubusercontent.com/vega/vega/main/docs/data/us-10m.json",
            "format": {"type": "topojson", "feature": "counties"}
          },
          "transform": [
            {
              "lookup": "id",
              "from": {
                "data": {
                  "url": "https://raw.githubusercontent.com/wasabi39/test/main/us_county.csv"
                },
                "key": "fips",
                "fields": ["population"]
              }
            }
          ],
          "projection": {"type": "albersUsa"},
          "mark": "geoshape",
          "encoding": {
            "color": {
              "condition": {
                "param": "togglePopulation",
                "field": "population",
                "title": "Population",
                "scale": {"type": "log", "scheme": "greens"},
                "type": "quantitative"
              },
              "value": "lightgrey"
            }
          }
        },
        {
          "data": {
            "url": "https://raw.githubusercontent.com/wasabi39/test/main/top_colleges_2022.csv"
          },
          "mark": "circle",
          "projection": {"type": "albersUsa"},
          "encoding": {
            "longitude": {"field": "longitude"},
            "latitude": {"field": "latitude"},
            "size": {"value": 25},
            "color": {
              "condition": {
                "test": {"param": "brush"},
                "field": "campusSetting",
                "title": "Campus setting",
                "type": "nominal",
                "scale": {"range": ["black", "purple", "red"]}
              },
              "value": "transparent"
            },
            "shape": {"field": "rank", "type": "nominal"},
            "tooltip": [
              {"field": "organizationName", "type": "nominal", "title": "Name"},
              {"field": "website", "type": "nominal", "title": "Website"},
              {"field": "state", "type": "nominal", "title": "State"},
              {"field": "city", "type": "nominal", "title": "City"},
              {"field": "rank", "type": "nominal", "title": "Rank"},
              {
                "field": "studentPopulation",
                "type": "quantitative",
                "title": "Student population"
              },
              {
                "field": "studentFacultyRatio",
                "type": "quantitative",
                "title": "Student-faculty ratio"
              }
            ]
          }
        }
      ]
    },
    {
      "repeat": {
        "column": [
          "studentPopulation",
          "studentFacultyRatio",
          "percentOfStudentsFinAid",
          "percentOfStudentsGrant"
        ]
      },
      "spec": {
        "width": 200,
        "height": 200,
        "mark": "point",
        "encoding": {
          "x": {"field": {"repeat": "column"}, "type": "quantitative"},
          "y": {"field": "rank", "type": "quantitative"},
          "color": {
            "condition": {
              "param": "brush",
              "field": "collegeType",
              "title": "College type",
              "type": "nominal",
              "scale": {"range": ["black", "green"]}
            },
            "value": "grey"
          },
          "tooltip": [
            {"field": "organizationName", "type": "nominal", "title": "Name"},
            {"field": "website", "type": "nominal", "title": "Website"},
            {"field": "state", "type": "nominal", "title": "State"},
            {"field": "city", "type": "nominal", "title": "City"},
            {"field": "rank", "type": "nominal", "title": "Rank"},
            {
              "field": "studentPopulation",
              "type": "quantitative",
              "title": "Student population"
            },
            {
              "field": "studentFacultyRatio",
              "type": "quantitative",
              "title": "Student-faculty ratio"
            }
          ]
        },
        "params": [
          {"name": "brush", "select": {"type": "interval", "resolve": "global"}}
        ]
      }
    }
  ],
  "params": [
    {
      "name": "togglePopulation",
      "value": "Show population",
      "bind": {"input": "select", "options": [true, false]}
    }
  ]
};

vegaEmbed("#vis", vegaLiteSpec);
