import { Box, CircularProgress, Typography } from "@mui/material"
import "./index.css"
import { useEffect, useState } from "react"

function LoadingComponent(isLoading : boolean, setLoading : void){

    const [percentage, setPercentage] = useState(0)

    useEffect(() => {
        while(percentage < 100){
            setPercentage(percentage+10)
        }
    }, [percentage])
    

    return(
        <div className="loading-container">
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                <CircularProgress variant="determinate"/>
                <Box
                    sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    }}
                >
                    <Typography
                    variant="caption"
                    component="div"
                    color="text.secondary"
                    >{`${Math.round(percentage)}%`}</Typography>
                </Box>
            </Box>
        </div>
    )
}

export default LoadingComponent