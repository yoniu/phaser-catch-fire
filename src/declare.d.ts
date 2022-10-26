declare enum NearMapPosition {
  Left,
  TopLeft,
  TopRight,
  Right,
  BottomRight,
  BottomLeft
}

declare interface Position {
  x: integer,
  y: integer
}
declare interface NearMap extends Position {
}

declare interface CurrentFire {
  position: Position,
  direction: NearMapPosition
}