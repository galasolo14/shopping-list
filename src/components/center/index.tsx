import React, {useState, useEffect, ChangeEvent} from "react";
import { Typography } from '@mui/material';
import { flexbox } from '@mui/system';
import Box from '@mui/material/Box';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { InputLabel, useScrollTrigger } from '@mui/material';
import { FormControl } from '@mui/material';
import { MenuItem } from '@mui/material';

interface Category {
    id: number;
    name: string;
  }

  interface Product {
    category: number|null;
    product: string;
    quantity: number;
  }

const Center = ({store}: any) => {
    const [categories, setCatagories]= useState<Category[]>([])
    const [category, setCatagory]= useState<number|null>(null)
    const [value, setValue]= useState('')
    const [list, setList]= useState<Product[]>([])

    useEffect(() => {
        getCategories();
      }, []);

    const getCategories = async () => {
        try{
            let result = await fetch('http://localhost:5000/api/categories');
            console.log(result)
            let data = await result.json();
            setCatagories(data);
            store.addCategories(data)
        }catch(error){
            throw(error)
        }
    
    }

    const  onAdd = () => {
        let newList = [...store.items]
        if(category && value.length){
            const checkItem = newList.findIndex(({product}) => product === value)
            if(checkItem === -1){
                let addToList: Product = {
                    category: category,
                    product: value,
                    quantity: 1,
                }
                newList = [...newList, addToList]
            }else{
                newList[checkItem].quantity = newList[checkItem].quantity+ 1
            }
            setList(newList)
            setValue('')
            store.onAdd(newList);
        }else{
            alert('עליך לבחור קטגוריה ומוצר לפני הוספה לרשימה')
        }
        

        
    }

    const setItemName = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setValue(e.target.value)
    }

    const setCatagoryId = (e: SelectChangeEvent<number | null>) => {
        setCatagory(e.target.value as number)
    }


    return <div>

    <   div style={{ margin: "20px", display: 'flex', justifyContent: "space-around", flexDirection: 'row-reverse', height: "300px" }} >
            <Box sx={{ minWidth: 240 }}>
                <FormControl fullWidth>
                <InputLabel id="select-label">קטגוריה</InputLabel>
                <Select
                    labelId="select-label"
                    id="select"
                    label="קטגוריה"
                    value={category}
                    onChange={(event) => setCatagoryId(event)}
                >
                    {categories.length > 0 && categories.map((category,idx) => (
                    <MenuItem value={category.id} key={idx}>{category.name} </MenuItem>
                    ))}
                </Select>
                </FormControl>
            </Box>
            <div >
            <TextField 
            id="item" 
            label="חיפוש מוצר" 
            variant="standard" 
            type="text"
            value={value}
            onChange={(event) => setItemName(event)} />
            </div>
            <div>
            <Button  variant="contained" style={{height: "50px"}} onClick={() => onAdd()}>הוסף לרשימה</Button>
            </div>
        </div>
    </div>
    
}

export default Center;