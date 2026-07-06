import React from 'react'
import { motion } from "motion/react";

const Page = () => {
  return (
    <div className='w-full h-screen flex justify-center items-center bg-black/50'>
        <div className="motion">
            {/* <motion.div
                initial = {
                    {
                        opacity : 0 , 
                        x : -100,
                        scale : 0
                    }
                }
                animate = {
                    {
                        opacity : 1,
                        x : 20,
                        scale : 1,
                    }
                }
                transition={ {
                    duration : 2 , 
                    delay : 0.5 , 
                    repeat : 0,
                    ease : "easeInOut"
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                exit = {
                    {
                        opacity : 0
                    }
                }
                className = 'w-[20] h-[20] bg-red-500 text-wrap'
            >
                center div will take 4 sec to grow full of its parent.
            </motion.div> */}

            <motion.button
                whileHover = {{scale : 1.1}}
                className = 'px-4 py-2 bg-red-500 text-white rounded-lg text-2xl font-bold'
                
            >
                click me
            </motion.button>
        </div>
      
    </div>
  )
}

export default Page
