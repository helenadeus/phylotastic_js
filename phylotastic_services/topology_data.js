{
  "nex:nexml": {
    "-xmlns": "http://www.nexml.org/1.0",
    "-xmlns:nex": "http://www.nexml.org/1.0",
    "-xmlns:rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns",
    "-xmlns:xsi": "http://www.w3.org/2001/XMLSchema-instance",
    "-generator": "Bio::Phylo::Project v.0.17_RC9_841",
    "-version": "0.8",
    "-xsi:schemaLocation": "http://www.nexml.org/1.0 http://www.nexml.org/1.0/nexml.xsd",
    "otus": {
      "-id": "otus1",
      "otu": [
        {
          "-id": "otu2",
          "-label": "otuA"
        },
        {
          "-id": "otu3",
          "-label": "otuB"
        },
        {
          "-id": "otu4",
          "-label": "otuC"
        },
        {
          "-id": "otu5",
          "-label": "otuD"
        },
        {
          "-id": "otu6",
          "-label": "otuE"
        },
        {
          "-id": "otu7",
          "-label": "otuF"
        }
      ]
    },
    "trees": {
      "-id": "trees16",
      "-otus": "otus1",
      "tree": {
        "-id": "tree18",
        "-label": "'the tree'",
        "-xsi:type": "nex:IntTree",
        "node": [
          {
            "-id": "node19",
            "-root": "true"
          },
          {
            "-id": "node20",
            "-label": "otuA",
            "-otu": "otu2"
          },
          { "-id": "node21" },
          { "-id": "node22" },
          { "-id": "node27" },
          { "-id": "node23" },
          {
            "-id": "node26",
            "-label": "otuD",
            "-otu": "otu5"
          },
          {
            "-id": "node28",
            "-label": "otuE",
            "-otu": "otu6"
          },
          {
            "-id": "node29",
            "-label": "otuF",
            "-otu": "otu7"
          },
          {
            "-id": "node24",
            "-label": "otuB",
            "-otu": "otu3"
          },
          {
            "-id": "node25",
            "-label": "otuC",
            "-otu": "otu4"
          }
        ],
        "edge": [
          {
            "-id": "edge20",
            "-length": "4",
            "-source": "node19",
            "-target": "node20"
          },
          {
            "-id": "edge21",
            "-length": "1",
            "-source": "node19",
            "-target": "node21"
          },
          {
            "-id": "edge22",
            "-length": "1",
            "-source": "node21",
            "-target": "node22"
          },
          {
            "-id": "edge27",
            "-length": "2",
            "-source": "node21",
            "-target": "node27"
          },
          {
            "-id": "edge23",
            "-length": "1",
            "-source": "node22",
            "-target": "node23"
          },
          {
            "-id": "edge26",
            "-length": "2",
            "-source": "node22",
            "-target": "node26"
          },
          {
            "-id": "edge28",
            "-length": "1",
            "-source": "node27",
            "-target": "node28"
          },
          {
            "-id": "edge29",
            "-length": "1",
            "-source": "node27",
            "-target": "node29"
          },
          {
            "-id": "edge24",
            "-length": "1",
            "-source": "node23",
            "-target": "node24"
          },
          {
            "-id": "edge25",
            "-length": "1",
            "-source": "node23",
            "-target": "node25"
          }
        ]
      }
    },
    "characters": {
      "-id": "characters8",
      "-otus": "otus1",
      "-xsi:type": "nex:StandardCells",
      "format": {
        "states": {
          "-id": "states10",
          "state": [
            {
              "-id": "s1",
              "-symbol": "0"
            },
            {
              "-id": "s2",
              "-symbol": "1"
            },
            {
              "-id": "s3",
              "-symbol": "2"
            },
            {
              "-id": "s4",
              "-symbol": "3"
            },
            {
              "-id": "s5",
              "-symbol": "4"
            },
            {
              "-id": "s6",
              "-symbol": "5"
            },
            {
              "-id": "s7",
              "-symbol": "6"
            },
            {
              "-id": "s8",
              "-symbol": "7"
            },
            {
              "-id": "s9",
              "-symbol": "8"
            },
            {
              "-id": "s10",
              "-symbol": "9"
            }
          ],
          "uncertain_state_set": [
            {
              "-id": "s11",
              "-symbol": "-"
            },
            {
              "-id": "s12",
              "-symbol": "?",
              "member": [
                { "-state": "s1" },
                { "-state": "s2" },
                { "-state": "s3" },
                { "-state": "s4" },
                { "-state": "s5" },
                { "-state": "s6" },
                { "-state": "s7" },
                { "-state": "s8" },
                { "-state": "s9" },
                { "-state": "s10" },
                { "-state": "s11" }
              ]
            }
          ]
        },
        "char": {
          "-id": "c1",
          "-states": "states10"
        }
      },
      "matrix": {
        "row": [
          {
            "-id": "row9",
            "-label": "otuA",
            "-otu": "otu2",
            "cell": {
              "-char": "c1",
              "-state": "s1"
            }
          },
          {
            "-id": "row11",
            "-label": "otuB",
            "-otu": "otu3",
            "cell": {
              "-char": "c1",
              "-state": "s3"
            }
          },
          {
            "-id": "row12",
            "-label": "otuC",
            "-otu": "otu4",
            "cell": {
              "-char": "c1",
              "-state": "s3"
            }
          },
          {
            "-id": "row13",
            "-label": "otuD",
            "-otu": "otu5",
            "cell": {
              "-char": "c1",
              "-state": "s1"
            }
          },
          {
            "-id": "row14",
            "-label": "otuE",
            "-otu": "otu6",
            "cell": {
              "-char": "c1",
              "-state": "s2"
            }
          },
          {
            "-id": "row15",
            "-label": "otuF",
            "-otu": "otu7",
            "cell": {
              "-char": "c1",
              "-state": "s1"
            }
          }
        ]
      }
    }
  }
}