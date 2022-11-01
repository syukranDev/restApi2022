const statisticFilter = async (arg) => {
    const res = await fetch('https://bitbucket.org/!api/2.0/snippets/tawkto/aA8zqE/4f62624a75da6d1b8dd7f70e53af8d36a1603910/files/webstats.json')
    var records = await res.json()

    //If startDate || endDate are declared 
    if (arg.startDate || arg.endDate) {
        var start = new Date(arg.startDate)
        var end = new Date(arg.endDate)

        var resultData = records.filter(a => {
            var dateNew = new Date(a.date);
            if (arg.startDate && !arg.endDate) { return (dateNew >= start) } 
            if (arg.startDate && arg.endDate) { return (dateNew >= start && dateNew <= end) }
        })
        var records = resultData
    }

    var result = records.reduce((newRecords, obj) => {
        var objForId = newRecords.filter((idObj) => { return idObj.websiteId === obj.websiteId})[0]
        
        if (objForId) {
            objForId.chats += obj.chats;
            objForId.missedChats += obj.missedChats;
        } else {
            newRecords.push({
                websiteId: obj.websiteId,
                chats: obj.chats,
                missedChats: obj.missedChats
          })
        }
      
        return newRecords;
      }, [])

    console.log(JSON.stringify(result))
}

const bothDates = {
    "startDate" : "2019-04-01", 
    "endDate" : "2019-04-09"
}

const partialDates = {
  "startDate" : "2019-04-10"
}

const noDate= {}

// statisticFilter(bothDates)
statisticFilter(partialDates)
// statisticFilter(noDate)

git