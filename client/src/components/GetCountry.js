import React,{useEffect,useState} from "react";

const GetCountry = () => {
   const[countries,setCountries] = useState([])
    useEffect(()=>{
        fetch('https://countries.trevorblades.com',{
            method:"Post",
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify({
                query:`
                query{
                    countries{
                      code
                      name
                      native
                      continent{
                        name
                        code
                      }
                      languages{
                        code
                        name
                        
                      }
                      emoji
                      states{
                        code
                        name
                      }
                      capital
                    }
                  }
                `
            })
        }).then(response => response.json())
        .then(results =>{
           console.log(results.data.countries)
           setCountries(results.data.countries)
        })
    },[])
    return(<main className="table-container">
    <h6>GraphQL endpoint - <span>External Resource "https://countries.trevorblades.com"  query -countries</span></h6>
<table className="table">
  <thead>
    <tr>
  
     
      <th><abbr title="Name">Country Name</abbr></th>
      <th><abbr title="Native">Native</abbr></th>
      <th><abbr title="Continent">Cont</abbr></th>
    

      
    </tr>
  </thead>
  <tfoot>
    <tr>

      <th><abbr title="Name">Country Name</abbr></th>
      <th><abbr title="Native">Native</abbr></th>
      <th><abbr title="Continent">Cont</abbr></th>
 
  
    </tr>
  </tfoot>
  <tbody>
    {countries.map((ele,key)=><tr key={key}>
          <td>{ele.name}</td>
      <td>{ele.native}</td>
      <td>{ele.continent.name}</td>
   
    </tr>)}
 
 
  </tbody>
</table>
    </main>)
}


export default GetCountry;
