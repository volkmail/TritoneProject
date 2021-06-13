import React, {useEffect, useState} from 'react';
import Section from './Section';
import styles from './Testing.module.css'
import {useDispatch, useSelector} from "react-redux";
import {GetSectionsData} from "../../redux/selectors/appData-selector";
import {GetSections} from "../../redux/selectors/testing-selector";
import {GetSectionsProgress} from "../../redux/ThunkCreators/testingThunks";

const Testing = () => {
    const sectionData = useSelector(GetSectionsData);
    const sectionProgress: Array<boolean> | null = useSelector(GetSections);
    const [unlockedSections, SetUnlockedSections] = useState<Array<boolean>>([false,false,false]);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(GetSectionsProgress());
    },[])

    useEffect(()=>{
        if(sectionProgress){
            let newUnlockedSections = [...sectionProgress];
            for(let i=0;i<newUnlockedSections.length;i++){
                if(!newUnlockedSections[i]){
                    newUnlockedSections[i] = true;
                    break;
                }
            }
            SetUnlockedSections(newUnlockedSections);
        }
    },[sectionProgress])

    return (
        <div className={styles.container}>
            {
                sectionProgress && sectionData
                    ? <>
                        {sectionData.map((el,index) => <Section unlockedSection={unlockedSections[index]} {...el}/>)}
                    </>
                    : <p>Загрузка прогресса обучения...</p>
            }
        </div>
    )
}

export default Testing;