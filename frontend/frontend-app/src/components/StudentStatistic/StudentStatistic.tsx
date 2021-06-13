import React, {useEffect, useMemo} from "react";
import style from "./StudentStatistic.module.css";
import {useDispatch, useSelector} from "react-redux";
import {GetStatisticData} from "../../redux/selectors/statistic-selector";
import {GetStatistic} from "../../redux/ThunkCreators/statisticThunks";
import StatisticTable from "./StatisticTable";
import {GridColumns, GridRowData, GridRowsProp} from "@material-ui/data-grid";

const StudentStatistic = () => {
    const statisticData = useSelector(GetStatisticData);
    const tableColumns: GridColumns = useMemo(() => {
        const result: GridColumns = [{
            field: "surname",
            headerName: "Фамилия",
            description: "Фамилиля студента",
            editable: false,
            type: "string",
            width: 130
        },{
            field: "name",
            headerName: "Имя",
            description: "Имя студента",
            editable: false,
            type: "string",
            width: 120
        },{
            field: "patronymic",
            headerName: "Отчество",
            description: "Отчество студента",
            editable: false,
            type: "string",
            width: 150
        },{
            field: "groupName",
            headerName: "Группа",
            description: "Группа студента",
            editable: false,
            type: "string",
            width: 120
        },{
            field: "section1",
            headerName: "Раздел №1",
            description: "Пройден/не пройден",
            editable: false,
            type: "string",
            width: 140
        },{
            field: "section2",
            headerName: "Раздел №2",
            description: "Пройден/не пройден",
            editable: false,
            type: "string",
            width: 140
        },{
            field: "section3",
            headerName: "Раздел №3",
            description: "Пройден/не пройден",
            editable: false,
            type: "string",
            width: 140
        },{
            field: "dateStart",
            headerName: "Дата начала обучения",
            description: "Дата начала обучения",
            editable: false,
            type: "string",
            width: 180
        },{
            field: "dateEnd",
            headerName: "Дата окончания обучения",
            description: "Дата окончания обучения",
            editable: false,
            type: "string",
            width: 200
        }]

        return result
    }, [statisticData]);
    const tableRows: GridRowsProp = useMemo(() => {
        let result: GridRowsProp = [];
        let id = 1;

        if(statisticData){
            statisticData.forEach(el => {
                let dateStart: string[] = el.timeStart?.toString().slice(0,10).split("-");
                let dateEnd: string[] = el.timeEnd?.toString().slice(0,10).split("-");

                let Row: GridRowData = {
                    id:id,
                    "surname": el.surname,
                    "name": el.name,
                    "patronymic": el.patronymic,
                    "groupName": el.groupName,
                    "section1": el.sections[0] ? "Пройден" : "Не пройден",
                    "section2": el.sections[1] ? "Пройден" : "Не пройден",
                    "section3": el.sections[2] ? "Пройден" : "Не пройден",
                    "dateStart": el.timeStart ? `${dateStart[2]}.${dateStart[1]}.${dateStart[0]}` : "Не приступил(-а) к работе",
                    "dateEnd": el.timeEnd ? `${dateEnd[2]}.${dateEnd[1]}.${dateEnd[0]}` : "Не закончил(-а) работу"
                }
                result = [...result, {...Row}];
                id += 1;
            })
        }

        return result
    }, [statisticData]);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(GetStatistic());
    },[])

    return(<div className={style.container}>
        <div className={style.table}>
            <p>Результаты обучения студентов</p>
            <StatisticTable tableColumns={tableColumns} tableRows={tableRows}/>
        </div>

    </div>)
}

export default StudentStatistic;