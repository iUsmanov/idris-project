// Code from internet
import type { OutputSelector, Selector } from '@reduxjs/toolkit';
import type { StateSchema } from '@/app/providers/StoreProvider';
import { useSelector } from 'react-redux';

/** First item in an array */
export type Head<T> = T extends [unknown, ...unknown[]] ? T[0] : never;

/** Last item in an array. Recursion also enables this to work with rest syntax - where the type of rest is extracted */
export type ReverseHead<S extends readonly unknown[][]> = Tail<S> extends [unknown]
	? S
	: Tail<S> extends readonly unknown[][]
	? ReverseHead<Tail<S>>
	: never;

/** All elements in array except last
 *
 * Recursion makes this work also when rest syntax has been used
 * Runs _ReverseTail twice, because first pass turns last element into "never", and second pass removes it.
 * */
export type ReverseTail<S> = _ReverseTail<_ReverseTail<S>>;
type _ReverseTail<S> = Tail<S> extends [unknown]
	? [Head<S>]
	: Tail<S> extends unknown[]
	? [Head<S>, ..._ReverseTail<Tail<S>>]
	: never;

type Intersect<T extends readonly unknown[]> = T extends []
	? unknown
	: // eslint-disable-next-line @typescript-eslint/no-shadow
	T extends [infer H, ...infer T]
	? H & Intersect<T>
	: T[number];

type ElementAt<T, N extends keyof any> = N extends keyof T ? T[N] : any;

type ElementsAt<T, N extends keyof any> = {
	[K in keyof T]: ElementAt<T[K], N>;
};

type MostProperties<T, U> = keyof U extends keyof T ? T : U;

type LongestTuple<T> = T extends [infer U extends unknown[]]
	? U
	: T extends [infer U, ...infer R extends any[][]]
	? MostProperties<U, LongestTuple<R>>
	: never;

type MergeTuples<T, L extends unknown[] = LongestTuple<T>> = {
	[K in keyof L]: Intersect<ElementsAt<T, K> extends readonly unknown[] ? ElementsAt<T, K> : never>;
};

type ExtractParameters<T extends readonly UnknownFunction[]> = {
	[K in keyof T]: Parameters<T[K]>;
};

export type MergeParameters<T extends readonly UnknownFunction[]> = '0' extends keyof T
	? MergeTuples<MakeRestExplicit<ExtractParameters<T>>>
	: Parameters<T[number]>;

type HasRest<S extends readonly unknown[]> = number extends S['length'] ? true : false;

type HasExplicit<S extends readonly unknown[]> = '0' extends keyof S ? true : false;

type HasCombined<S extends readonly unknown[]> = true extends HasExplicit<S> & HasRest<S>
	? true
	: false;

type MakeRestExplicit<T extends readonly unknown[][]> = true extends HasCombined<T>
	? [...ReverseTail<T>, ReverseHead<T> extends readonly unknown[] ? ReverseHead<T>[number] : never]
	: true extends HasRest<T>
	? [...T]
	: T;

export type SelectorArray = Array<Selector>;

type UnknownFunction = (...args: unknown[]) => unknown;

export type ExtractReturnType<T extends readonly UnknownFunction[]> = {
	[index in keyof T]: T[index] extends T[number] ? ReturnType<T[index]> : never;
};

export type SelectorResultArray<Selectors extends SelectorArray> = ExtractReturnType<Selectors>;

/** Determines the combined "Params" type (all remaining args) from all input selectors */
export type GetParamsFromSelectors<
	S extends SelectorArray,
	RemainingItems extends readonly unknown[] = Tail<MergeParameters<S>>,
> = RemainingItems;

/** All other items in an array */
export type Tail<A> = A extends [unknown, ...infer Rest] ? Rest : never;

type SingleSelector<T> = (state: StateSchema) => T;

export type ResultSelector<FR> = [() => FR, SingleSelector<FR>];

export type ResultMemoized<
	FR,
	S extends SelectorArray,
	C extends (...args: SelectorResultArray<S>) => FR,
	Params extends readonly unknown[] = never,
	Keys = object,
> = [() => FR, OutputSelector<S, FR, C, Params, Keys>];

// =================================================================
// =================================================================
// =================================================================
// =================================================================
// =================================================================
// =================================================================
// =================================================================
// =================================================================

/**
 * @description when more than one selector is passed, the last argument is the combiner
 * @template S, FR
 * @param {any} selectors
 * @returns {ResultMemoized<FR, S, (...args: SelectorResultArray<S>) => FR, GetParamsFromSelectors<S>>}
 */

export function buildSelector<FR, S extends SelectorArray>(
	...selectors: [...S, (...args: SelectorResultArray<S>) => FR]
): ResultMemoized<FR, S, (...args: SelectorResultArray<S>) => FR, GetParamsFromSelectors<S>>;

/**
 * when only one selector is passed, the result is a selector
 * @template FR
 * @param {(state: StateSchema) => FR} selector
 * @returns {ResultSelector<FR>}
 */
export function buildSelector<FR>(selector: (state: StateSchema) => FR): ResultSelector<FR>;

export function buildSelector<FR, S extends SelectorArray>(
	...selectors: [...S, (...args: SelectorResultArray<S>) => FR]
):
	| ResultMemoized<FR, S, (...args: SelectorResultArray<S>) => FR, GetParamsFromSelectors<S>>
	| ResultSelector<FR> {
	const combiner = selectors.length > 1 ? selectors.pop() : undefined;
	let selector: Selector<StateSchema, FR>;

	if (combiner !== undefined) {
		// @ts-expect-error problem with 'ExtractReturnType<S>'
		selector = createSelector(selectors, combiner);
	} else {
		selector = selectors[0] as Selector<StateSchema, FR>;
	}

	const useSelectorHook = () => {
		return useSelector(selector);
	};

	return [useSelectorHook, selector];
}
