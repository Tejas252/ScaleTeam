import React, { useEffect, useMemo, useState } from 'react'
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, Button, Input, ListGroup, ListGroupItem, Table } from 'reactstrap'

export const DataList = () => {

    const [data, setData] = useState()
    const [res, setRes] = useState([])
    const [groupedData, setGroupedData] = useState({})
    console.log("🚀 ~ file: DataList.jsx:9 ~ DataList ~ groupedData:", groupedData)
    const [searchId, setSearchId] = useState()
    var dataList = []

    function groupBy(arr, keyFunc) {
        return arr.reduce((result, item) => {
            const key = keyFunc(item);
            if (!result[key]) {
                result[key] = [];
            }
            result[key].push(item);
            console.log("🚀 ~ file: DataList.jsx:21 ~ returnarr.reduce ~ Array.from(result):", Object.keys(result))
            return result;
        }, {});
    }
    const postApi = () => {

        // console.log("🚀 ~ file: DataList.jsx:13 ~ data?.reduce ~ data:", data)
        //     data?.reduce((pUSerId,curUserId,i) => {
        //         if(pUSerId === curUserId.userId){
        //             if(data.length-1 === i){
        //                 dataList.push( <AccordionItem>
        //                     <AccordionHeader targetId={pUSerId}>{`User-Id   ${pUSerId}`}</AccordionHeader>
        //                     <AccordionBody accordionId={pUSerId}>
        //                         { data?.map((val,i) => {
        //                             return val.userId === pUSerId && 
        //                             <pre key={val.id}>
        //                                 <pre active>User id : {val.userId}</pre>
        //                                 <pre>Id : {val.id}</pre>
        //                                 <pre>Title : {val.title}</pre>
        //                                 <pre>Body : {val.body}</pre>
        //                             </pre>
        //                         })}
        //                     </AccordionBody>
        //                     </AccordionItem>)
        //             }
        //         return curUserId.userId
        //         }else{

        //                dataList.push( <AccordionItem>
        //                 <AccordionHeader targetId={+pUSerId}>{`User-Id   ${pUSerId}`}</AccordionHeader>
        //                 <AccordionBody accordionId={+pUSerId}>
        //                     { data?.map((val,i) => {
        //                         return val.userId === pUSerId && 
        //                         <pre key={val.id}>
        //                             <pre active>User id : {val.userId}</pre>
        //                             <pre>Id : {val.id}</pre>
        //                             <pre>Title : {val.title}</pre>
        //                             <pre>Body : {val.body}</pre>
        //                         </pre>
        //                     })}
        //                 </AccordionBody>
        //                 </AccordionItem>)

        //             return curUserId.userId
        //         }
        //     },data[0]?.userId)
        // setRes(dataList)

        setGroupedData(groupBy(data, (users) => { return users.userId }))
        tableData()
    }

    const tableData = () => {

        Object?.keys(groupedData)?.forEach((val) => {
            // console.log("🚀 ~ file: DataList.jsx:119 ~ {groupedData[val]?.map ~ groupedData[val]:", groupedData[val]);
            dataList.push(<AccordionItem>
                <AccordionHeader targetId={val}>{val}</AccordionHeader>
                <AccordionBody accordionId={val}>
                    <Table>
                        <thead>
                            <th>userID</th>
                            <th>id</th>
                            <th>Body</th>
                            <th>Title</th>
                        </thead>
                        <tbody>
                            {groupedData[val]?.map((value, index) => {
                                return <tr scope='row' key={value?.id}>
                                    <td>{value?.userId}</td>
                                    <td>{value?.id}</td>
                                    <td>{value?.body}</td>
                                    <td>{value?.title}</td>
                                </tr>
                            })}
                        </tbody>
                    </Table>
                </AccordionBody>
            </AccordionItem>)
        })
        setRes(dataList)
    }


    useEffect(() => {
        if (searchId) {
            fetch(`https://jsonplaceholder.typicode.com/posts/${searchId}`)
                .then((response) => response.json())
                .then((json) => setData([json]))


        } else {
            fetch(`https://jsonplaceholder.typicode.com/posts`)
                .then((response) => response.json())
                .then((json) => (setData(json)))
        }
    }, [searchId, res])
    console.log("🚀 ~ file: DataList.jsx:54 ~ DataList ~ res:", res)


    const [open, setOpen] = useState('1');
    const toggle = (id) => {
        if (open === id) {
            setOpen();
        } else {
            setOpen(id);
        }
    }
    return (

        <>

            <Input type='search' placeholder='Search' value={searchId} onChange={(e) => (setSearchId(e.target.value))} />
            <Button onClick={postApi}>Click</Button>
            {/* <div>
                        <Accordion open={open} toggle={toggle}>
                            {res}
                    </Accordion>
                    </div> */}
            <Accordion open={open} toggle={toggle}>
                {
                    res
                }
            </Accordion>
        </>
    )
}
