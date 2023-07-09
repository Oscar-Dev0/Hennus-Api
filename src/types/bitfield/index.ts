import { HennusError, errorCodes } from "../../core/Error";

export class BitField<T extends string, N extends number | bigint = number> {

    public Flags: EnumLike<unknown, number | bigint> = {};

    public DefaultBit = 0;
    public bitfield: N;


    constructor(bits?: BitFieldResolvable<T, N>) {
        //@ts-ignore
        if(bits) this.bitfield = this.resolve(bits);
    };


    any(bit: BitFieldResolvable<T, N>): boolean {
        //@ts-ignore
        return (this.bitfield & this.resolve(bit)) !== this.DefaultBit;
    };


    equals(bit: BitFieldResolvable<T, N>): boolean {
        return this.bitfield === this.resolve(bit);
    };


    has(bit: BitFieldResolvable<T, N>): boolean {
        //@ts-ignore
        bit = this.resolve(bit);
        //@ts-ignore
        return (this.bitfield & bit) === bit;
    };


    missing(bits: BitFieldResolvable<T, N>, ...hasParams: any[]): T[] {
        return new BitField(bits).remove(this).toArray(...hasParams) as T[];
    };


    freeze(): Readonly<BitField<T, N>> {
        return Object.freeze(this);
    };


    add(...bits: BitFieldResolvable<T, N>[]): BitField<T, N> {
        let total = this.DefaultBit;
        for (const bit of bits) {
            //@ts-ignore
            total |= this.resolve(bit);
        }
        //@ts-ignore
        if (Object.isFrozen(this)) return new BitField<T, N>(this.bitfield | total);
        //@ts-ignore
        this.bitfield |= total;
        return this;
    };


    remove(...bits: BitFieldResolvable<T, N>[]): BitField<T, N> {
        let total = this.DefaultBit;
        for (const bit of bits) {
            //@ts-ignore
            total |= this.resolve(bit);
        }
        //@ts-ignore
        if (Object.isFrozen(this)) return new BitField<T, N>(this.bitfield & ~total);
        //@ts-ignore
        this.bitfield &= ~total;
        return this;
    }

    serialize(...hasParams: readonly unknown[]): Record<T, boolean> {
        //@ts-ignore
        const serialized: Record<T, boolean> = {};
        for (const [flag, bit] of Object.entries(this.Flags)) {
            //@ts-ignore
            if (isNaN(flag)) serialized[flag] = this.has(bit, ...hasParams);
        }
        return serialized;
    }


    toArray(...hasParams: readonly unknown[]): T[] {
        return [...this[Symbol.iterator](...hasParams)] as T[];
    }

    toJSON() {
        return typeof this.bitfield === 'number' ? this.bitfield : this.bitfield.toString();
    }

    valueOf() {
        return this.bitfield;
    }

    *[Symbol.iterator](...hasParams: readonly unknown[]): IterableIterator<T> {
        for (const bitName of Object.keys(this.Flags)) {
            //@ts-ignore
            if (isNaN(bitName) && this.has(bitName, ...hasParams)) yield bitName;
        }
    }


    resolve(bit?: BitFieldResolvable<string, number | bigint>): number | bigint {
        const DefaultBit = this.DefaultBit;
        //@ts-ignore
        if (typeof DefaultBit === typeof bit && bit >= DefaultBit) return bit;
        //@ts-ignore
        if (bit instanceof BitField) return bit;
        //@ts-ignore
        if (Array.isArray(bit)) return bit.map(p => this.resolve(p)).reduce((prev, p) => prev | p, DefaultBit);
        if (typeof bit === 'string') {
            //@ts-ignore
            if (!isNaN(bit)) return typeof DefaultBit === 'bigint' ? BigInt(bit) : Number(bit);
            //@ts-ignore
            if (this.Flags[bit] !== undefined) return this.Flags[bit];
        }
        throw new HennusError(errorCodes.bitsError);
    }
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

/**
 * @author oscarDev
 * @description funciones Inspirada de discordjs.
 */