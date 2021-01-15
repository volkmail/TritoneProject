import React from 'react';
import style from './EquipmentArticle.module.css';

const EquipmentArticle = (props) => {
    return (
        <div className={style.article_text2}>
            <table border="1">
                <caption style={{marginBottom: "1vh"}}><b>Состав базового комплекта изделия "Тритон" и его
                    дополнительные опции</b></caption>
                <tr>
                    <th style={{textAlign:"center"}}>Наименование</th>
                    <th style={{textAlign:"center"}}>Тип, модель</th>
                    <th style={{textAlign:"center"}}>Количество, шт.</th>
                </tr>
                <tr>
                    <td className={style.table_first_column}>1 Блок согласования и преобразования</td>
                    <td>БСП<br/>МСШЕ.421711.001</td>
                    <td className="table_third_column">1 комплект</td>
                </tr>
                <tr>
                    <td className={style.table_first_column}>2 Персональная ЭВМ</td>
                    <td>Notebook</td>
                    <td className={style.table_third_column}>1 комплект</td>
                </tr>
                <tr>
                    <td className={style.table_first_column}>3 ICP-конденсаторный микрофон</td>
                    <td>TMS130D20</td>
                    <td className={style.table_third_column}>1 комплект</td>
                </tr>
                <tr>
                    <td className={style.table_first_column}>4 ICP-акселерометр (вибродатчик)</td>
                    <td>AP98-100</td>
                    <td className={style.table_third_column}>1 комплект</td>
                </tr>
                <tr>
                    <td className={style.table_first_column}>5 Кабель измерительный 2 м</td>
                    <td>ШК-И2</td>
                    <td className={style.table_third_column}>1</td>
                </tr>
                <tr>
                    <td className={style.table_first_column}>6 Кабель интерфейса USB 1,5 м</td>
                    <td>тип А-В</td>
                    <td className={style.table_third_column}>1</td>
                </tr>
                <tr>
                    <td className={style.table_first_column}>7 Держатель микрофона</td>
                    <td>МСШЕ.434590.001</td>
                    <td className={style.table_third_column}>1</td>
                </tr>
                <tr>
                    <td className={style.table_first_column}>8 Программное обеспечение изделия<br/>
                        "Тритон" (дистрибутивный носитель с)<br/>
                        ключом защиты Aladdin HASP USB Key)
                    </td>
                    <td>"Тритон-Интерфейс"<br/>
                        МСШЕ.503300.012
                    </td>
                    <td className={style.table_third_column}>1 комплект</td>
                </tr>
                <tr>
                    <td className={style.table_first_column}>9 Штатив для микрофона</td>
                    <td>SVA 20 Unomat<br/>
                        (или аналогичный)
                    </td>
                    <td className={style.table_third_column}>1</td>
                </tr>
                <tr>
                    <td className={style.table_first_column}>10 Эксплуатационная документация в составе:</td>
                    <td></td>
                    <td></td>
                </tr>
                <tr>
                    <td className={style.table_first_column}>- "Анализатор спектра цифровой<br/>
                        интегрирующий "Тритон". Руководство по<br/>
                        эксплуатации
                    </td>
                    <td>МСШЕ.438150.001 РЭ</td>
                    <td className={style.table_third_column}>1</td>
                </tr>
                <tr>
                    <td className={style.table_first_column}>- "Анализатор спектра цифровой<br/>
                        интегрирующий "Тритон". Формуляр
                    </td>
                    <td>МСШЕ.438150.001 ФО</td>
                    <td className={style.table_third_column}>1</td>
                </tr>
                <tr>
                    <td className={style.table_first_column}>- "Анализатор спектра цифровой<br/>
                        интегрирующий "Тритон". Паспорт
                    </td>
                    <td>МСШЕ.438150.001 ПС</td>
                    <td className={style.table_third_column}>1</td>
                </tr>
                <tr>
                    <td className={style.table_first_column}>- Техническая документация и паспорта на<br/>
                        покупные средства измерений
                    </td>
                    <td></td>
                    <td className={style.table_third_column}>1 комплект</td>
                </tr>
                <tr>
                    <td colSpan="3" style={{textAlign: "center"}}><b>Дополнительные опции</b></td>
                </tr>
                <tr>
                    <td className={style.table_first_column}>11 Источник калиброванного звукового<br/>
                        давления "Larson&Davis" с адаптером<br/>
                        для калибровки мкрофонов 1/2-1/4' ADP024
                    </td>
                    <td>CAL200</td>
                    <td className={style.table_third_column}>1 комплект</td>
                </tr>
                <tr>
                    <td className={style.table_first_column}>12 ICP-акселерометр повышенной<br/>
                        чувствительности
                    </td>
                    <td>352B</td>
                    <td className={style.table_third_column}>1</td>
                </tr>
                <tr>
                    <td className={style.table_first_column}>13 Переход коаксиальный BNC-BNC</td>
                    <td></td>
                    <td className={style.table_third_column}>1</td>
                </tr>
                <tr>
                    <td className={style.table_first_column}>14 Приспособление для крепления<br/>
                        акселерометра на трубы
                    </td>
                    <td>МСШЕ.434590.002</td>
                    <td className={style.table_third_column}>1</td>
                </tr>
                <tr>
                    <td className={style.table_first_column}>15 Полужесткая транспортная укладка для<br/>
                        изделия "Тритон"
                    </td>
                    <td>МСШЕ.878280.004</td>
                    <td className={style.table_third_column}>1</td>
                </tr>
                <tr>
                    <td className={style.table_first_column}>16 Мастика для крепления акселерометра</td>
                    <td>МСШЕ.225700.1</td>
                    <td className={style.table_third_column}>1</td>
                </tr>
                <tr>
                    <td className={style.table_first_column}>17 Кабель измерительный 20 м</td>
                    <td>ШК-И20</td>
                    <td className={style.table_third_column}>1</td>
                </tr>
                <tr>
                    <td className={style.table_first_column}>18 USB-разветвитель</td>
                    <td>USB-HUB</td>
                    <td className={style.table_third_column}>1</td>
                </tr>
            </table>
        </div>
    );
}

export default EquipmentArticle;