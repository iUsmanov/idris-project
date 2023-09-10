import { lazy } from 'react';
import { TypeOfTabs } from './Tabs';

export const TabsAsync = lazy<TypeOfTabs>(() =>
	import('./Tabs').then((module) => ({ default: module.Tabs }))
);

/* 

import { AppLinkBeautyProps } from '@/shared/components/AppLink/Beauty/AppLink';
import { ButtonBeautyProps } from '@/shared/components/Button/Beauty/Button';
import { CardBeautyProps } from '@/shared/components/Card/Beauty/Card';
import { CodeBeautyProps } from '@/shared/components/Code/Beauty/Code';
import { IconBeautyProps } from '@/shared/components/Icon/Beauty/Icon';
import { InputBeautyProps } from '@/shared/components/Input/Beauty/Input';
import { DropdownBeautyProps } from '@/shared/components/Popups/components/Dropdown/Beauty/Dropdown';
import { ListBoxBeautyProps } from '@/shared/components/Popups/components/ListBox/Beauty/ListBox';
import { PopoverBeautyProps } from '@/shared/components/Popups/components/Popover/Beauty/Popover';
import { SkeletonBeautyProps } from '@/shared/components/Skeleton/Beauty/Skeleton';
import { StarRatingBeautyProps } from '@/shared/components/StarRating/Beauty/StarRating';
import { TabsBeautyProps } from '@/shared/components/Tabs/Beauty/Tabs';
import { TextBeautyProps } from '@/shared/components/Text/Beauty/Text';
import {
	FC,
	LazyExoticComponent,
	ReactNode,
	createContext,
	memo,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';

interface BeautySharedContextPayload {
	AppLink?: LazyExoticComponent<FC<AppLinkBeautyProps>>;
	Button?: LazyExoticComponent<FC<ButtonBeautyProps>>;
	Card?: LazyExoticComponent<FC<CardBeautyProps>>;
	Code?: LazyExoticComponent<FC<CodeBeautyProps>>;
	Icon?: LazyExoticComponent<FC<IconBeautyProps>>;
	Input?: LazyExoticComponent<FC<InputBeautyProps>>;
	Skeleton?: LazyExoticComponent<FC<SkeletonBeautyProps>>;
	StarRating?: LazyExoticComponent<FC<StarRatingBeautyProps>>;
	Tabs?: LazyExoticComponent<FC<TabsBeautyProps>>;
	Text?: LazyExoticComponent<FC<TextBeautyProps>>;
	Dropdown?: LazyExoticComponent<FC<DropdownBeautyProps>>;
	ListBox?: LazyExoticComponent<FC<ListBoxBeautyProps>>;
	Popover?: LazyExoticComponent<FC<PopoverBeautyProps>>;
	// ===
	isLoaded?: boolean;
}

interface BeautySharedProvider {
	children: ReactNode;
}

const BeautySharedContext = createContext<BeautySharedContextPayload>({});

const getAsyncBeautySharedModules = async () => {
	return Promise.all([
		import('@/shared/components/AppLink/Beauty/AppLink.async'),
		import('@/shared/components/Button/Beauty/Button.async'),
		import('@/shared/components/Card/Beauty/Card.async'),
		import('@/shared/components/Code/Beauty/Code.async'),
		import('@/shared/components/Icon/Beauty/Icon.async'),
		import('@/shared/components/Input/Beauty/Input.async'),
		import('@/shared/components/Skeleton/Beauty/Skeleton.async'),
		import('@/shared/components/StarRating/Beauty/StarRating.async'),
		import('@/shared/components/Tabs/Beauty/Tabs.async'),
		import('@/shared/components/Text/Beauty/Text.async'),
		import('@/shared/components/Popups/components/Dropdown/Beauty/Dropdown.async'),
		import('@/shared/components/Popups/components/ListBox/Beauty/ListBox.async'),
		import('@/shared/components/Popups/components/Popover/Beauty/Popover.async'),
	]);
};

export const useBeautySharedComponents = () => {
	return useContext(BeautySharedContext) as Required<BeautySharedContextPayload>;
};

export const BeautySharedProvider = memo((props: BeautySharedProvider) => {
	const { children } = props;
	const AppLinkRef = useRef<LazyExoticComponent<FC<AppLinkBeautyProps>>>();
	const ButtonRef = useRef<LazyExoticComponent<FC<ButtonBeautyProps>>>();
	const CardRef = useRef<LazyExoticComponent<FC<CardBeautyProps>>>();
	const CodeRef = useRef<LazyExoticComponent<FC<CodeBeautyProps>>>();
	const IconRef = useRef<LazyExoticComponent<FC<IconBeautyProps>>>();
	const InputRef = useRef<LazyExoticComponent<FC<InputBeautyProps>>>();
	const SkeletonRef = useRef<LazyExoticComponent<FC<SkeletonBeautyProps>>>();
	const StarRatingRef = useRef<LazyExoticComponent<FC<StarRatingBeautyProps>>>();
	const TabsRef = useRef<LazyExoticComponent<FC<TabsBeautyProps>>>();
	const TextRef = useRef<LazyExoticComponent<FC<TextBeautyProps>>>();
	const DropdownRef = useRef<LazyExoticComponent<FC<DropdownBeautyProps>>>();
	const ListBoxRef = useRef<LazyExoticComponent<FC<ListBoxBeautyProps>>>();
	const PopoverRef = useRef<LazyExoticComponent<FC<PopoverBeautyProps>>>();
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		getAsyncBeautySharedModules().then(
			([
				AppLink,
				Button,
				Card,
				Code,
				Icon,
				Input,
				Skeleton,
				StarRating,
				Tabs,
				Text,
				Dropdown,
				ListBox,
				Popover,
			]) => {
				AppLinkRef.current = AppLink.AppLinkAsync;
				ButtonRef.current = Button.ButtonAsync;
				CardRef.current = Card.CardAsync;
				CodeRef.current = Code.CodeAsync;
				IconRef.current = Icon.IconAsync;
				InputRef.current = Input.InputAsync;
				SkeletonRef.current = Skeleton.SkeletonAsync;
				StarRatingRef.current = StarRating.StarRatingAsync;
				TabsRef.current = Tabs.TabsAsync;
				TextRef.current = Text.TextAsync;
				DropdownRef.current = Dropdown.DropdownAsync;
				ListBoxRef.current = ListBox.ListBoxAsync;
				PopoverRef.current = Popover.PopoverAsync;
				// =======
				setIsLoaded(true);
			}
		);
	}, []);

	const value = useMemo(
		() => ({
			AppLink: AppLinkRef.current,
			Button: ButtonRef.current,
			Card: CardRef.current,
			Code: CodeRef.current,
			Icon: IconRef.current,
			Input: InputRef.current,
			Skeleton: SkeletonRef.current,
			StarRating: StarRatingRef.current,
			Tabs: TabsRef.current,
			Text: TextRef.current,
			Dropdown: DropdownRef.current,
			ListBox: ListBoxRef.current,
			Popover: PopoverRef.current,
			// ====
			isLoaded,
		}),
		[isLoaded]
	);

	return <BeautySharedContext.Provider value={value}>{children}</BeautySharedContext.Provider>;
});

import { AppLinkBeautyProps } from '@/shared/components/AppLink/Beauty/AppLink';
import { ButtonBeautyProps } from '@/shared/components/Button/Beauty/Button';
import { CardBeautyProps } from '@/shared/components/Card/Beauty/Card';
import { CodeBeautyProps } from '@/shared/components/Code/Beauty/Code';
import { IconBeautyProps } from '@/shared/components/Icon/Beauty/Icon';
import { InputBeautyProps } from '@/shared/components/Input/Beauty/Input';
import { DropdownBeautyProps } from '@/shared/components/Popups/components/Dropdown/Beauty/Dropdown';
import { ListBoxBeautyProps } from '@/shared/components/Popups/components/ListBox/Beauty/ListBox';
import { PopoverBeautyProps } from '@/shared/components/Popups/components/Popover/Beauty/Popover';
import { SkeletonBeautyProps } from '@/shared/components/Skeleton/Beauty/Skeleton';
import { StarRatingBeautyProps } from '@/shared/components/StarRating/Beauty/StarRating';
import { TabsBeautyProps } from '@/shared/components/Tabs/Beauty/Tabs';
import { TextBeautyProps } from '@/shared/components/Text/Beauty/Text';
import {
	FC,
	LazyExoticComponent,
	ReactNode,
	createContext,
	memo,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';

interface BeautySharedContextPayload {
	AppLink?: LazyExoticComponent<FC<AppLinkBeautyProps>>;
	Button?: LazyExoticComponent<FC<ButtonBeautyProps>>;
	Card?: LazyExoticComponent<FC<CardBeautyProps>>;
	Code?: LazyExoticComponent<FC<CodeBeautyProps>>;
	Icon?: LazyExoticComponent<FC<IconBeautyProps>>;
	Input?: LazyExoticComponent<FC<InputBeautyProps>>;
	Skeleton?: LazyExoticComponent<FC<SkeletonBeautyProps>>;
	StarRating?: LazyExoticComponent<FC<StarRatingBeautyProps>>;
	Tabs?: LazyExoticComponent<FC<TabsBeautyProps>>;
	Text?: LazyExoticComponent<FC<TextBeautyProps>>;
	Dropdown?: LazyExoticComponent<FC<DropdownBeautyProps>>;
	ListBox?: LazyExoticComponent<FC<ListBoxBeautyProps>>;
	Popover?: LazyExoticComponent<FC<PopoverBeautyProps>>;
	// ===
	isLoaded?: boolean;
}

interface BeautySharedProvider {
	children: ReactNode;
}

const BeautySharedContext = createContext<BeautySharedContextPayload>({});

const getAsyncBeautySharedModules = async () => {
	return Promise.all([
		import('@/shared/components/AppLink/Beauty/AppLink.async'),
		import('@/shared/components/Button/Beauty/Button.async'),
		import('@/shared/components/Card/Beauty/Card.async'),
		import('@/shared/components/Code/Beauty/Code.async'),
		import('@/shared/components/Icon/Beauty/Icon.async'),
		import('@/shared/components/Input/Beauty/Input.async'),
		import('@/shared/components/Skeleton/Beauty/Skeleton.async'),
		import('@/shared/components/StarRating/Beauty/StarRating.async'),
		import('@/shared/components/Tabs/Beauty/Tabs.async'),
		import('@/shared/components/Text/Beauty/Text.async'),
		import('@/shared/components/Popups/components/Dropdown/Beauty/Dropdown.async'),
		import('@/shared/components/Popups/components/ListBox/Beauty/ListBox.async'),
		import('@/shared/components/Popups/components/Popover/Beauty/Popover.async'),
	]);
};

export const useBeautySharedComponents = () => {
	return useContext(BeautySharedContext) as Required<BeautySharedContextPayload>;
};

export const BeautySharedProvider = memo((props: BeautySharedProvider) => {
	const { children } = props;
	const AppLinkRef = useRef<LazyExoticComponent<FC<AppLinkBeautyProps>>>();
	const ButtonRef = useRef<LazyExoticComponent<FC<ButtonBeautyProps>>>();
	const CardRef = useRef<LazyExoticComponent<FC<CardBeautyProps>>>();
	const CodeRef = useRef<LazyExoticComponent<FC<CodeBeautyProps>>>();
	const IconRef = useRef<LazyExoticComponent<FC<IconBeautyProps>>>();
	const InputRef = useRef<LazyExoticComponent<FC<InputBeautyProps>>>();
	const SkeletonRef = useRef<LazyExoticComponent<FC<SkeletonBeautyProps>>>();
	const StarRatingRef = useRef<LazyExoticComponent<FC<StarRatingBeautyProps>>>();
	const TabsRef = useRef<LazyExoticComponent<FC<TabsBeautyProps>>>();
	const TextRef = useRef<LazyExoticComponent<FC<TextBeautyProps>>>();
	const DropdownRef = useRef<LazyExoticComponent<FC<DropdownBeautyProps>>>();
	const ListBoxRef = useRef<LazyExoticComponent<FC<ListBoxBeautyProps>>>();
	const PopoverRef = useRef<LazyExoticComponent<FC<PopoverBeautyProps>>>();
	const [isLoaded, setIsLoaded] = useState(false);

	useEffect(() => {
		getAsyncBeautySharedModules().then(
			([
				AppLink,
				Button,
				Card,
				Code,
				Icon,
				Input,
				Skeleton,
				StarRating,
				Tabs,
				Text,
				Dropdown,
				ListBox,
				Popover,
			]) => {
				AppLinkRef.current = AppLink.AppLinkAsync;
				ButtonRef.current = Button.ButtonAsync;
				CardRef.current = Card.CardAsync;
				CodeRef.current = Code.CodeAsync;
				IconRef.current = Icon.IconAsync;
				InputRef.current = Input.InputAsync;
				SkeletonRef.current = Skeleton.SkeletonAsync;
				StarRatingRef.current = StarRating.StarRatingAsync;
				TabsRef.current = Tabs.TabsAsync;
				TextRef.current = Text.TextAsync;
				DropdownRef.current = Dropdown.DropdownAsync;
				ListBoxRef.current = ListBox.ListBoxAsync;
				PopoverRef.current = Popover.PopoverAsync;
				// =======
				setIsLoaded(true);
			}
		);
	}, []);

	const value = useMemo(
		() => ({
			AppLink: AppLinkRef.current,
			Button: ButtonRef.current,
			Card: CardRef.current,
			Code: CodeRef.current,
			Icon: IconRef.current,
			Input: InputRef.current,
			Skeleton: SkeletonRef.current,
			StarRating: StarRatingRef.current,
			Tabs: TabsRef.current,
			Text: TextRef.current,
			Dropdown: DropdownRef.current,
			ListBox: ListBoxRef.current,
			Popover: PopoverRef.current,
			// ====
			isLoaded,
		}),
		[isLoaded]
	);

	return <BeautySharedContext.Provider value={value}>{children}</BeautySharedContext.Provider>;
});


*/
