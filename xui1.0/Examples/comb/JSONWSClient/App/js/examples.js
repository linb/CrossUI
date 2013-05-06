var examplesSetting = [
    {
        id:"Google -- Search",
        url:"http://ajax.googleapis.com/ajax/services/search/web",
        args:{
            v:"1.0",
            q:"CrossUI"
        }
    },
    {
        id:"Google -- Calendar",
        url:"http://www.google.com/calendar/feeds/developer-calendar@google.com/public/full",
        args:{
            alt:"json"
        }
    },
    {
        id:"Google -- Shopping",
        url:"https://www.googleapis.com/shopping/search/v1/public/products",
        args:{
            ApiKey : "AIzaSyCFI3UIj7SSUwxZg7t5DQYA0KKncCEJTqk",
            country :"US",
            q:"digital+camera"
        }
    },
    {
        id:"Google -- Translate",
        url:"https://www.googleapis.com/language/translate/v2",
        args:{
            key : "AIzaSyCFI3UIj7SSUwxZg7t5DQYA0KKncCEJTqk",
            source:"en",
            target:"zh-CN",
            q:"CrossUI RAD Tools"
        }
    },
    {
        id:"GeoNames -- Address Lookup",
        url:"http://api.geonames.org/postalCodeLookupJSON",
        args:{
            postalcode:"6600",
            country:"AT",
            username:"demo"
        }
    },
    {
        id:"GeoNames -- Cities",
        url:"http://api.geonames.org/citiesJSON",
        args:{
            north:44.1,
            south:-9.9,
            east:-22.4,
            west:55.2,
            lang:"en",
            username:"demo" 
        }
    },
    {
        id:"GeoNames --Earthquakes",
        url:"http://api.geonames.org/earthquakesJSON",
        args:{
            north:44.1,
            south:-9.9,
            east:-22.4,
            west:55.2,
            username:"demo"
        }
    },
    {
        id:"GeoNames -- Weather",
        url:"http://api.geonames.org/weatherJSON",
        args:{
            north:44.1,
            south:-9.9,
            east:-22.4,
            west:55.2,
            username:"demo"
        }
    }
];
