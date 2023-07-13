import { HennusError, errorCodes } from "../../core/Error";

export class BitField<T extends string, N extends number | bigint = number> {
    public Flags: EnumLike<unknown, number | bigint> = {};
    public DefaultBit: number | bigint = 0;
    public bitfield: number | bigint;

    constructor(bits?: BitFieldResolvable<T, N>) {
        if (bits) this.bitfield = this.resolve(bits);
    };

    any(bit: BitFieldResolvable<T, N>): boolean {
        const resolvedBit = this.resolve(bit);
        const bitfield = this.bitfield;
        if (typeof bitfield === "bigint" && typeof resolvedBit === "bigint") return (bitfield & resolvedBit) !== BigInt(this.DefaultBit);
        else if (typeof bitfield === "number" && typeof resolvedBit === "number") return (bitfield & resolvedBit) !== this.DefaultBit;
        else return false;
    };

    equals(bit: BitFieldResolvable<T, N>): boolean {
        return this.bitfield === this.resolve(bit);
    };

    has(bit: BitFieldResolvable<T, N>): boolean {
        const resolvedBit = this.resolve(bit);
        const bitfield = this.bitfield;
        if (typeof bitfield === "bigint" && typeof resolvedBit === "bigint") return (bitfield & resolvedBit) === resolvedBit;
        else if (typeof bitfield === "number" && typeof resolvedBit === "number") return (bitfield & resolvedBit) === resolvedBit;
        else return false;
    };

    missing(bits: BitFieldResolvable<T, N>, ...hasParams: any[]): T[] {
        return new BitField(bits).remove(this).toArray(...hasParams) as T[];
    };

    freeze(): Readonly<BitField<T, N>> {
        return Object.freeze(this);
    };

    add(...bits: BitFieldResolvable<T, N>[]): BitField<T, N> {
        let total: number | bigint = this.DefaultBit;
        for (const bit of bits) {
            total = this.bitwiseOr(total, this.resolve(bit));
        }
        if (Object.isFrozen(this)) return new BitField<T, N>(this.bitwiseOr(this.bitfield, total));
        this.bitfield = this.bitwiseOr(this.bitfield, total);
        return this;
    };

    private bitwiseOr(a: number | bigint, b: number | bigint): N {
        if (typeof a === "bigint" && typeof b === "bigint") return (a | b) as N;
        else if (typeof a === "number" && typeof b === "number") return (a | b) as N;
        else return (Number(a) | Number(b)) as N;
    };

    remove(...bits: BitFieldResolvable<T, N>[]): BitField<T, N> {
        let total: number | bigint = this.DefaultBit;
        for (const bit of bits) {
            total = this.bitwiseOr(total, this.resolve(bit));
        }
        if (Object.isFrozen(this)) return new BitField<T, N>(this.bitwiseAnd(this.bitfield, this.bitwiseNot(total)));
        this.bitfield = this.bitwiseAnd(this.bitfield, this.bitwiseNot(total));
        return this;
    };

    private bitwiseAnd(a: number | bigint, b: number | bigint): N {
        if (typeof a === "bigint" && typeof b === "bigint") return (a & b) as N;
        else if (typeof a === "number" && typeof b === "number") return (a & b) as N;
        else return ( Number(a) & Number(b) ) as N;
    };

    private bitwiseNot(a: number | bigint): N {
        if (typeof a === "bigint") return ~a as N;
        else if (typeof a === "number") return ~a as N;
        else return ~a  as N;
    };

    serialize(...hasParams: readonly unknown[]): Record<T, boolean> {
        const serialized = {} as Record<T, boolean>;
        const paramsArray = hasParams as BitFieldResolvable<T, N>[];
        for (const [flag, bit] of Object.entries(this.Flags)) {
            if (isNaN(parseFloat(flag))) {
                //@ts-ignore
                serialized[flag as T] = this.has(bit as BitFieldResolvable<T, N>, ...paramsArray);
            }
        }
        return serialized;
    };


    toArray(...hasParams: readonly unknown[]): T[] {
        return [...this[Symbol.iterator](...hasParams)] as T[];
    };

    toJSON() {
        return typeof this.bitfield === 'number' ? this.bitfield : this.bitfield.toString();
    };

    valueOf() {
        return this.bitfield;
    };

    *[Symbol.iterator](...hasParams: readonly unknown[]): IterableIterator<T> {
        for (const bitName of Object.keys(this.Flags)) {
            //@ts-ignore
            if (isNaN(Number(bitName)) && this.has(bitName as BitFieldResolvable<T, N>, ...hasParams)) yield bitName as T;
        };
    };

    resolve(bit?: BitFieldResolvable<string, number | bigint>): number | bigint {
        const DefaultBit = this.DefaultBit;
        if (typeof DefaultBit === typeof bit && bit as number | bigint >= DefaultBit) return bit as number | bigint;
        if (bit instanceof BitField) return bit.bitfield as number | bigint;
        if (Array.isArray(bit)) return bit.map(p => this.resolve(p)).reduce((prev, p) => this.bitwiseOr(prev, p), DefaultBit);
        if (typeof bit === 'string') {
            if (!isNaN(Number(bit))) return typeof DefaultBit === 'bigint' ? BigInt(bit) : Number(bit);
            if (this.Flags[bit as keyof typeof this.Flags] !== undefined) return this.Flags[bit as keyof typeof this.Flags];
        };
        throw new HennusError(errorCodes.bitsError);
    };
};

export type BitFieldResolvable<T extends string, N extends number | bigint> =
    | RecursiveReadonlyArray<T | N | `${bigint}` | Readonly<BitField<T, N>>>
    | T
    | N
    | `${bigint}`
    | Readonly<BitField<T, N>>;

export type RecursiveReadonlyArray<T> = ReadonlyArray<T | RecursiveReadonlyArray<T>>;

export type EnumLike<E, V> = Record<keyof E, V>;

export * from "./intentsbitfield";
export * from "./overwritesbitfields";
export * from "./permissions";
export * from "./flagsbifields";
export type PermissionsString = keyof typeof Permissions;

/**
 * @description Funciones inspiradas en discordjs.
 * @author oscarDev
 */
