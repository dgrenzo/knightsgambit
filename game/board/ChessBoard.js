"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var _ = require("lodash");
var Tile_1 = require("./Tile");
var ChessPiece_1 = require("./pieces/ChessPiece");
var Scene_1 = require("../../engine/scene/Scene");
var data_1 = require("./pieces/movement/data");
var ChessBoard = (function (_super) {
    __extends(ChessBoard, _super);
    function ChessBoard() {
        var _this = _super.call(this) || this;
        _this.getTileAt = function (pos) {
            var tile = null;
            _.forEach(_this.getElementsAt(pos), function (entity) {
                if (entity instanceof Tile_1.Tile) {
                    tile = entity;
                    return false;
                }
                return true;
            });
            return tile;
        };
        _this.getPieceAt = function (pos) {
            var piece = null;
            _.forEach(_this.getElementsAt(pos), function (entity) {
                if (!piece && entity instanceof ChessPiece_1.ChessPiece) {
                    piece = entity;
                    return false;
                }
                return true;
            });
            return piece;
        };
        _this.tileExists = function (pos) {
            return _this.getTileAt(pos) !== null;
        };
        _this.tileEmpty = function (pos) {
            return _this.getPieceAt(pos) === null;
        };
        _this.getMoveOptions = function (piece) {
            var move_patterns = piece.getMoves();
            var options = [];
            _.forEach(move_patterns, function (pattern) {
                var next = {
                    x: piece.x,
                    y: piece.y,
                };
                var repeat = pattern.repeating;
                do {
                    next.x += pattern.offset.x;
                    next.y += pattern.offset.y;
                    repeat = repeat && _this.tileExists(next) && _this.tileEmpty(next);
                    if (_this.canMoveToPosition(piece, next, pattern.tile_flags)) {
                        options.push({
                            pos: {
                                x: next.x,
                                y: next.y,
                            },
                        });
                    }
                } while (repeat);
            });
            return options;
        };
        return _this;
    }
    ChessBoard.prototype.init = function (board_config) {
        var _this = this;
        this.m_elements = [];
        board_config.entities.forEach(function (p_cfg) {
            _this.addElement(new ChessPiece_1.ChessPiece(p_cfg));
        });
        board_config.tiles.forEach(function (pos) {
            _this.addElement(new Tile_1.Tile(pos[0], pos[1]));
        });
    };
    ChessBoard.prototype.getElementsAt = function (pos) {
        if (!pos) {
            return [];
        }
        var elements = [];
        this.m_elements.forEach(function (ent) {
            if (ent.x === pos.x && ent.y === pos.y) {
                elements.push(ent);
            }
        });
        return elements;
    };
    ChessBoard.prototype.canMoveToPosition = function (actor, target, tile_flags) {
        var tile = this.getTileAt(target);
        if (!tile) {
            return false;
        }
        var occupant = this.getPieceAt(target);
        if (!occupant) {
            if ((tile_flags & data_1.OccupantFlag.Empty) === data_1.OccupantFlag.Empty) {
                return true;
            }
            else {
                return false;
            }
        }
        if (actor.getFaction() === occupant.getFaction() && (tile_flags & data_1.OccupantFlag.Ally) === data_1.OccupantFlag.Ally) {
            return true;
        }
        if (actor.getFaction() !== occupant.getFaction() && (tile_flags & data_1.OccupantFlag.Enemy) === data_1.OccupantFlag.Enemy) {
            return true;
        }
        return false;
    };
    return ChessBoard;
}(Scene_1.Scene));
exports.ChessBoard = ChessBoard;
function GetTileColor(pos) {
    return (pos.x + pos.y) % 2;
}
exports.GetTileColor = GetTileColor;
