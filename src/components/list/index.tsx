import React from "react";
import { Typography } from '@mui/material';
import { Button } from '@mui/material';
import { observer } from "mobx-react";
import Divider from '@mui/material/Divider';


const List = observer(({store}: any) => {

    // let categoriezed = [...store.categories]
    let itemsNew = [...store.items]

    let clening: any = []  // id 1
    let veggies: any = []  // id 2
    let dairy: any = []  // id 3
    let meatFish: any = [] //id 4
    let bakery: any = [] //id 5

    
    for(const element of itemsNew){
        if(element.category === 1){
            clening.push(element)
        }
        if(element.category === 2){
            veggies.push(element)
        }
        if(element.category === 3){
            dairy.push(element)
        }
        if(element.category === 4){
            meatFish.push(element)
        }
        if(element.category === 5){
            bakery.push(element)
        }
    }

    const finishOrder = async () => {
        if(itemsNew.length > 0){
            try{
                let result = await fetch('http://localhost:5000/api/save', {
                    method: 'POST',
                    body: JSON.stringify(itemsNew),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                if(result.status === 200){
                    let data = await result.json();
                    if(data){
                        alert(data)
                    }
                    store.onAdd([])
                }
            }catch (error){
                throw(error)
            }
        }else{
            alert('עליך להוסיף פריטים לפני סיום הזמנה')
        }
        
            
    }

    return <div>
        <Typography align="center" variant="h4" color="blue" >יש לאסוף מוצרים אלו במחלקות המתיאמות</Typography>
        <Button  variant="contained" style={{height: "50px"}} onClick={() => finishOrder()}> סיים הזמנה</Button>
            <div style={{marginLeft: "100px", display: 'flex', justifyContent: "space-around",flexDirection: 'row-reverse'}}>
               {clening.length > 0 &&
                <div>
               <Typography align="center" variant="h5" color="#5F9EA0" >מוצרי ניקיון {clening.length}</Typography>
               <Divider />
               {clening.length > 0 && clening.map((item:any) => (
                <Typography align="center" variant="h6" color="#5F9EA0" >{item.quantity} {item.product}</Typography>
               ))}
               </div>
               }
               {veggies.length > 0 &&
                <div>
               <Typography align="center" variant="h5" color="#5F9EA0" >ירקות ופירות {veggies.length}</Typography>
               <Divider />
               {veggies.length > 0 && veggies.map((item: any) => (
                <Typography align="center" variant="h6" color="#5F9EA0" >{item.quantity} {item.product}</Typography>
               ))}
               </div>
               }
               {dairy.length > 0 &&
                <div>
               <Typography align="center" variant="h5" color="#5F9EA0" >גבינות {dairy.length}</Typography>
               <Divider />
               {dairy.length > 0 && dairy.map((item: any) => (
                <Typography align="center" variant="h6" color="#5F9EA0" >{item.quantity} {item.product}</Typography>
               ))}
               </div>
               }
               {meatFish.length > 0 &&
                <div>
               <Typography align="center" variant="h5" color="#5F9EA0" >בשר ודגים {meatFish.length}</Typography>
               <Divider />
               {meatFish.length > 0 && meatFish.map((item: any) => (
                <Typography align="center" variant="h6" color="#5F9EA0" >{item.quantity} {item.product}</Typography>
               ))}
               </div>
               }
               {bakery.length > 0 &&
                <div>
               <Typography align="center" variant="h5" color="#5F9EA0" >מאפים {bakery.length}</Typography>
               <Divider />
               {bakery.length > 0 && bakery.map((item: any) => (
                <Typography align="center" variant="h6" color="#5F9EA0" >{item.quantity} {item.product}</Typography>
               ))}
               </div>
               }
            </div>
            
        </div>
});

export default List;