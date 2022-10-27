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

declare interface ButtonStyle {
  bgColor: number,
  bgColorHover: number
}
declare interface ButtonType {
  width: integer,
  height: integer,
  text: string,
  textStyle: Phaser.Types.GameObjects.Text.TextStyle,
  buttonStyle: ButtonStyle
  radius: integer,
  callback: () => void
}