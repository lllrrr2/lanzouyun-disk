import React, {useState} from 'react'
import {ScrollView} from '../component/ScrollView'
import {Header} from '../component/Header'
import {Button} from '../component/Button'
import {Bar} from '../component/Bar'
import {Icon} from '../component/Icon'
import {byteToSize} from '../../common/util'
import {Table} from '../component/Table'
import upload, {UploadInfo} from '../store/Upload'
import {Input, Textarea} from '../component/Input'
import {Modal} from '../component/Modal'
import {observer} from 'mobx-react'

const Upload = observer(() => {
  const [showItem, setShowItem] = useState<UploadInfo>(null)

  return (
    <ScrollView
      HeaderComponent={
        <>
          <Header>
            <Button>全部暂停</Button>
            <Button>全部开始</Button>
            <Button>全部删除</Button>
          </Header>
          <Bar>
            <span>正在上传</span>
          </Bar>
        </>
      }
    >
      <Table header={['文件名', '大小', '操作']}>
        {upload.list.map(item => {
          return (
            <tr key={item.filePath}>
              <td
                onClick={() => {
                  setShowItem(item)
                }}
              >
                <Icon iconName={'file'} />
                <span>{item.fileName}</span>
                {item.tasks.length > 1 && <span>{` | ${item.tasks.length} 个子任务`}</span>}
              </td>
              <td>{`${byteToSize(item.resolve)} / ${byteToSize(item.size)}`}</td>
              <td>{/*todo:操作*/}</td>
              <td></td>
            </tr>
          )
        })}
      </Table>

      <Modal visible={!!showItem}>
        <div className='dialog'>
          <ScrollView style={{maxHeight: 400, minHeight: 200, width: 600}}>
            {showItem?.tasks?.map(item => (
              <p key={item.fileName}>{`${item.fileName}  |  ${item.status}`}</p>
            ))}
          </ScrollView>
          <div style={{textAlign: 'right', paddingTop: 16}}>
            <Button onClick={() => setShowItem(null)}>取消</Button>
          </div>
        </div>
      </Modal>
    </ScrollView>
  )
})

export default Upload
