# Backend APIs

1.  "/options" returns an object of arrays of age ranges, tenure, city tier and all the family type details

```
{
    "options": {
        "age_ranges": [
            "18-24",
            "25-35"...

        ],
        "child_age_ranges": [
            "1-4",
            "5-10",...
        ],
        "cityTiers": [
            1,
            2
        ],
        "member_csv": {
            "1 Adult": {
                "adults": 1,
                "children": 0,
                "name": "1a"
            },
            "1 Adult and 1 Child": {
                "adults": 1,
                "children": 1,
                "name": "1a,1c"
            },...
        },
        "sumInsuredinLakhs": [
            500000,
            700000,...

        ],
        "tenure": [
            1,
            2
        ]
    }
}
```

2. "/find_records" takes in member_csv and age ranges as parameters and returns the insurance data for each age range.

For example: "/find_records?member_csv=2a,1c&age_range=18-24" returns

```
{
    "data": [
        {
            "1000000": 14835.0,
            "1500000": 19393.0,
            "2000000": 20509.0,
            "2500000": 22007.0,
            "3000000": 24453.0,
            "4000000": 30499.0,
            "500000": 12549.0,
            "5000000": 39115.0,
            "6000000": 41573.0,
            "700000": 13223.0,
            "7500000": 69398.0,
            "_id": "653758adfaf105268672cb8a",
            "age_range": "18-24",
            "member_csv": "2a,1c",
            "tier": "tier-1"
        }
    ]
}
```

# Running the app locally

## 1. Starting the server locally

Navigate to the backend folder and run the following command in the terminal

```
python server.py
```

## 2. Starting the frontend locally

Namvigate to the frontend folder and run the below command to install all the node modules required to run the app

```
npm install
```

After all the node modules are downloaded run the below command to start the app

```
npm start
```
