## react 拖拽库

`dnd` 是 Drag and Drop 的意思，即 托 和 拽，下面来看经常使用的第三方库 `react-beautiful-dnd`

### react-beautiful-dnd

#### 安装
```bash
  # npm
  npm install react-beautiful-dnd

  # yarn
  yarn add react-beautiful-dnd
```

#### 快速开始
##### DragDropContext
最外层的容器组件，包裹在内部的 `Droppable` 和 `Draggable` 可以拖拽

##### Droppable
可拖动的组件，可以包裹一个或多个 `Draggable` 

* **droppableId**： 必须设置 DroppableId(string) 唯一标识该应用程序，请不要更改此 Props - 特别是在拖动时
* **type**：可选的 TypeId(string)可以用来简单地接受一类Draggable
* **isDropDisabled**： 可选的标志来控制当前是否允许丢弃Droppable，你可以用它来实现你自己的条件丢弃逻辑，它将默认为false
* **direction**： 物品在这个物品中流动的方向，选项是vertical (默认) 和horizontal

DragDropContext 的 children 必须是一个纯函数，返回一个 ReactElement
```jsx
<Droppable droppableId="droppable-1">
  {(provided, snapshot) => ({
    /*...*/
  })}
</Droppable>;
```
children 函数的参数：
* **provided**
  * `provided.innerRef`  为了使 droppable 能够正常工作，你必须绑定到最高可能的DOM节点中provided.innerRef
  * `provided.placeholder` 根据需要拖动，Droppable 当用户拖动不是主列表的列表时，需要此空间，请确保将 `占位符` 放在您为其提供 ref 的组件中
  * `provided.droppableProps` (DroppableProps) 它需要应用于您应用的相同元素， provided.innerRef 它目前包含一个data属性，我们用它来控制一些不可见的CSS
* **snapshot**
  * `snapshot.isDropDisabled`  匹配type当前正在拖动Draggable

##### Draggable
Draggable 组件可以拖动并拖放到其 Droppables 上，一个 Draggable 必须始终包含在一个 Droppable

#### 效果
##### 纵向组件拖拽
![纵向组件拖拽](work/images/dnd1.webp)
```js
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// 初始化数据
const getItems = (count) => Array.from({ length: count }, (v, k) => k).map(
  k => ({ id: `item-${k + 1}`, content: `content - ${k + 1}` })
)

class APP extends Component {
  constructor(props) {
    super(props)

    this.state = {
      items: getItems(9)
    }

    this.handleDragEnd = this.handleDragEnd.bind(this)
  }

  handleDragEnd({ draggableId, source, destination }) {
    console.log(draggableId, source, destination)
    if (!destination) {
      return
    }
    const result = Array.from(this.state.items)
    const [removed] = result.splice(source.index, 1)
    result.splice(destination.index, 0, removed)

    this.setState({
      items: result
    })
  }

  render() {
    return <DragDropContext onDragEnd={this.handleDragEnd}>
      <center>
        <Droppable droppableId="mydrop">
          {
            (provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {
                  this.state.items.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {
                        (provided, snapshot) => (
                          <div
                            className={`item ${snapshot.isDragging ? "active" : ""}`}
                            ref={provided.innerRef}
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                          >
                            {item.content}
                          </div>
                        )
                      }
                    </Draggable>
                  ))
                }
              </div>
            )
          }
        </Droppable>
      </center>
    </DragDropContext>
  }
}
```

##### 横向组件拖拽
![横向组件拖拽](work/images/dnd2.webp)
主要是 Droppable 组件要设置 `direction="horizontal"`
```js
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

// 初始化数据
const getItems = (count) => Array.from({ length: count }, (v, k) => k).map(
  k => ({ id: `item-${k + 1}`, content: `content - ${k + 1}` })
)

class APP extends Component {
  constructor(props) {
    super(props)

    this.state = {
      items: getItems(9)
    }

    this.handleDragEnd = this.handleDragEnd.bind(this)
  }

  handleDragEnd({ draggableId, source, destination }) {
    console.log(draggableId, source, destination)
    if (!destination) {
      return
    }
    const result = Array.from(this.state.items)
    const [removed] = result.splice(source.index, 1)
    result.splice(destination.index, 0, removed)

    this.setState({
      items: result
    })
  }

  render() {
    return <DragDropContext onDragEnd={this.handleDragEnd}>
      <center>
        <Droppable droppableId="mydrop" direction="horizontal">
          {
            (provided, snapshot) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {
                  this.state.items.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {
                        (provided, snapshot) => (
                          <div
                            className={`item ${snapshot.isDragging ? "active" : ""}`}
                            ref={provided.innerRef}
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                          >
                            {item.content}
                          </div>
                        )
                      }
                    </Draggable>
                  ))
                }
              </div>
            )
          }
        </Droppable>
      </center>
    </DragDropContext>
  }
}
```

##### 多个区域拖动
![多个区域拖动](work/images/dnd3.webp)