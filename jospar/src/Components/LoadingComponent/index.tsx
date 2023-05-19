import { Box, CircularProgress, Typography } from "@mui/material"
import "./index.css"
import { useEffect, useState } from "react"

function LoadingComponent(){

    const [isLoading, setLoading] = useState(true)
    const [percentage, setPercentage] = useState(0)

    useEffect(() => {
        setTimeout(()=>{
            setPercentage(percentage+10)
        }, 1000)
        if(percentage == 100){
            setLoading(false)
        }
    }, [percentage])

    return(
        <div className="loading-container">
            {isLoading && 
            
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
            
            }

            {!isLoading && <div>Jospar is ready</div>}
        </div>
    )
}

export default LoadingComponent