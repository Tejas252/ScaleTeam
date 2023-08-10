import React, { useEffect, useState } from 'react'
import "./Tabing.css"
import { Input } from 'reactstrap'


export const Tabing = () => {
    const [tabs, setTabs] = useState([])
    // console.log("🚀 ~ file: Tabing.jsx:7 ~ Tabing ~ tabs:", tabs)
    const [active, setActive] = useState()
    const [tabValue, setTabValue] = useState([])

    var tabsval = []
    useEffect(() => {
        // setActive(tabs[0]?.data)
        // console.log(tabs[0])

    }, [tabs])



    const closeTab = (val) => {
        setTabs((tabs) => (tabs.filter((value) => (value.data !== val))))
    }

    const handleTab = (e) => {
        setTabs(Array.from(e.target.selectedOptions, option => {           
            return { data: option.value };
        }))
        handleSwitch(e.target.value)
    }

    const handleSwitch = (val) => {
        setActive(val)

    }
    console.log(tabValue)
    const handleTabData = (e, data) => {
        // console.log("🚀 ~ file: Tabing.jsx:45 ~ handleTabData ~ data:", data)
        // setTabValue((tabValue) => tabValue.filter((val) => (val?.data !== data)))

        const data2 = [...tabs];
        const index = data2?.findIndex(d => d?.data === data);
        // console.log("🚀 ~ file: Tabing.jsx:50 ~ handleTabData ~ index:", index)
        if (index >= 0) {
            data2[index].name = e.target.value;
        } else {
            // setTabValue((tabValue) => [...tabValue,])
            data2.push({ data, name: e.target.value })
        }
        setTabs(data2)
    }

    const  handlePhoto = (e) => {
        
        console.log("🚀 ~ file: Tabing.jsx:56 ~ handlePhoto ~ e.target.value:", e)
        // e.target.value = ""
        console.log("🚀 ~ file: Tabing.jsx:57 ~ handlePhoto ~ e.target.value :", e )
    }

    return (

        <>
            <select name="Tabs" onChange={(e) => handleTab(e)} multiple>
                <option value="chrome">Chrome</option>
                <option value="second">Second</option>
                <option value="third">Third</option>
                <option value="fourth">Fourth</option>
                <option value="fifth">Fifth</option>
            </select>
            <div className="d-flex tab-container">
                {tabs?.map((val) => (
                    <div key={val} className="tab" onClick={() => handleSwitch(val?.data)}>{val?.data}
                        <span className='tab-closer' onClick={() => (closeTab(val?.data))}>  &times;</span>
                    </div>))}
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-3">
                        {
                            tabs.map((val, i) => {
                                return val?.data === active &&
                                    <input key={val?.data}
                                        name={val?.data}
                                        type="text"
                                        value={tabs.find((val) => (val?.data === active))?.name}
                                        // value={}
                                        onChange={(e) => (handleTabData(e, val?.data))} />
                            })
                        }



                    </div>
                </div>
            </div>

            <Input type='file' onChange={handlePhoto}/>
        </>
    )
}
