import React from 'react';
import Section from './Section';
import styles from './Testing.module.css'
import {useSelector} from "react-redux";
import {GetSectionsData} from "../../redux/selectors/appData-selector";

const Testing = () => {
    const sectionData = useSelector(GetSectionsData);

    return(
        <div className={styles.container}>
            {sectionData.map(el => <Section {...el}/>)}
        </div>
    )
}

export default Testing;