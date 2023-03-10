import React, { useState } from "react";
import moment from "moment";
import Timeline from "react-calendar-timeline";
import generateData, { Group, Item } from "./generate-random";

const keys = {
  groupIdKey: "id",
  groupTitleKey: "title",
  groupRightTitleKey: "rightTitle",
  itemIdKey: "id",
  itemTitleKey: "title",
  itemDivTitleKey: "title",
  itemGroupKey: "group",
  itemTimeStartKey: "start",
  itemTimeEndKey: "end",
  groupLabelKey: "title"
};

 const App = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [items, setItems] = useState<Item[]>([]);
  const [defaultTimeStart, setDefaultTimeStart] = useState(moment().startOf("day").toDate());
  const [defaultTimeEnd, setDefaultTimeEnd] = useState(moment().startOf("day").add(1, "day").toDate());



  function itemRenderer({
    //@ts-ignore
    item, itemContext, getItemProps, getResizeProps,
  }) {
    const {
      left: leftResizeProps, right: rightResizeProps,
    } = getResizeProps();

    const backgroundColor = item.selected ? itemContext.selectedColor : itemContext.bgColor;

    return (
      <div
        {...getItemProps({
          style: {
            backgroundColor,
            color: itemContext.color,
            borderColor: itemContext.color,
            left: `${itemContext.left}px`,
            width: `${itemContext.width}px`,
          },
          onMouseDown: itemContext.dragStart,
          onMouseUp: itemContext.dragEnd,
        })}
      >
        {itemContext.useResizeHandle ? (
          <div
            {...leftResizeProps}
            style={{
              position: 'absolute',
              height: '100%',
              width: '10px',
              left: '-5px',
              cursor: 'col-resize',
            }} />
        ) : null}

        <div
          style={{
            height: itemContext.dimensions.height,
            overflow: 'hidden',
            paddingLeft: 3,
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {item.title}
        </div>

        {itemContext.useResizeHandle ? (
          <div
            {...rightResizeProps}
            style={{
              position: 'absolute',
              height: '100%',
              width: '10px',
              right: '-5px',
              cursor: 'col-resize',
            }} />
        ) : null}
      </div>
    );
  }


  React.useEffect(() => {
    const { groups, items } = generateData();
    setGroups(groups);
    setItems(items);
  }, []);

  return (
    <Timeline
      groups={groups}
    //@ts-ignore
      items={items}
      keys={keys}
      itemTouchSendsClick={false}
      stackItems
      itemHeightRatio={0.75}
      canMove={false}
      canResize={false}
      defaultTimeStart={defaultTimeStart}
      defaultTimeEnd={defaultTimeEnd}
      itemRenderer={itemRenderer}
    />);
}
export default App;