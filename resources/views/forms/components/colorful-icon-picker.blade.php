<x-dynamic-component
    :component="$getFieldWrapperView()"
    :field="$field"
>
    @php
        $icons = [
            'heroicon-o-home', 'heroicon-o-user', 'heroicon-o-cog', 'heroicon-o-star', 'heroicon-o-heart', 'heroicon-o-bolt', 'heroicon-o-fire', 'heroicon-o-sparkles', 'heroicon-o-cube', 'heroicon-o-globe-alt', 'heroicon-o-camera', 'heroicon-o-video-camera', 'heroicon-o-megaphone', 'heroicon-o-pencil-square', 'heroicon-o-paint-brush', 'heroicon-o-code-bracket', 'heroicon-o-chart-bar', 'heroicon-o-shopping-bag', 'heroicon-o-rocket-launch', 'heroicon-o-users', 'heroicon-o-cube-transparent', 'heroicon-o-cursor-arrow-rays', 'heroicon-o-document-text', 'heroicon-o-presentation-chart-bar', 'heroicon-o-chat-bubble-left-ellipsis', 'heroicon-o-shield-check', 'heroicon-o-check-circle', 'heroicon-o-currency-dollar', 'heroicon-o-adjustments-horizontal', 'heroicon-o-academic-cap', 'heroicon-o-archive-box', 'heroicon-o-arrow-trending-up', 'heroicon-o-banknotes', 'heroicon-o-bell', 'heroicon-o-bookmark', 'heroicon-o-briefcase', 'heroicon-o-building-office', 'heroicon-o-building-storefront', 'heroicon-o-calculator', 'heroicon-o-calendar', 'heroicon-o-chat-bubble-bottom-center-text', 'heroicon-o-clipboard-document-check', 'heroicon-o-clock', 'heroicon-o-cloud', 'heroicon-o-command-line', 'heroicon-o-cpu-chip', 'heroicon-o-credit-card', 'heroicon-o-device-phone-mobile', 'heroicon-o-envelope', 'heroicon-o-exclamation-triangle', 'heroicon-o-finger-print', 'heroicon-o-flag', 'heroicon-o-folder', 'heroicon-o-gift', 'heroicon-o-globe-asia-australia', 'heroicon-o-hand-thumb-up', 'heroicon-o-hashtag', 'heroicon-o-inbox', 'heroicon-o-key', 'heroicon-o-language', 'heroicon-o-lifebuoy', 'heroicon-o-light-bulb', 'heroicon-o-link', 'heroicon-o-lock-closed', 'heroicon-o-magnifying-glass', 'heroicon-o-map', 'heroicon-o-map-pin', 'heroicon-o-microphone', 'heroicon-o-moon', 'heroicon-o-musical-note', 'heroicon-o-newspaper', 'heroicon-o-paper-airplane', 'heroicon-o-paper-clip', 'heroicon-o-pause', 'heroicon-o-phone', 'heroicon-o-photo', 'heroicon-o-play', 'heroicon-o-puzzle-piece', 'heroicon-o-qr-code', 'heroicon-o-radio', 'heroicon-o-receipt-percent', 'heroicon-o-scale', 'heroicon-o-scissors', 'heroicon-o-server', 'heroicon-o-share', 'heroicon-o-signal', 'heroicon-o-speaker-wave', 'heroicon-o-sun', 'heroicon-o-swatch', 'heroicon-o-ticket', 'heroicon-o-trash', 'heroicon-o-trophy', 'heroicon-o-truck', 'heroicon-o-tv', 'heroicon-o-video-camera', 'heroicon-o-wifi', 'heroicon-o-wrench', 'heroicon-o-information-circle'
        ];
        $colors = ['bg-blue-500', 'bg-orange-500', 'bg-green-500', 'bg-red-500', 'bg-purple-500', 'bg-yellow-500', 'bg-teal-500', 'bg-indigo-500', 'bg-pink-500', 'bg-gray-700'];
    @endphp

    <div x-data="{ 
        state: $wire.$entangle('{{ $getStatePath() }}'),
        isOpen: false
    }">
        <div class="flex items-center gap-3">
            <button type="button" @click="isOpen = true" class="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2">
                <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>
                Pilih Icon
            </button>
            <div x-show="state" style="display: none;" class="text-sm text-gray-500 dark:text-gray-400 font-medium">
                Terpilih: <span x-text="state"></span>
            </div>
        </div>

        <div x-show="isOpen" style="display: none;" class="fixed inset-0 z-[99] flex items-center justify-center bg-black/50 p-4">
            <div @click.away="isOpen = false" class="bg-white dark:bg-gray-900 rounded-lg shadow-xl w-full max-w-4xl max-h-[80vh] flex flex-col">
                <div class="flex justify-between items-center p-4 border-b dark:border-gray-700">
                    <h3 class="text-lg font-semibold dark:text-white">Icon List</h3>
                    <button @click="isOpen = false" type="button" class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                    </button>
                </div>
                <div class="p-6 overflow-y-auto">
                    <div class="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12 gap-2">
                        @foreach($icons as $index => $icon)
                            @php
                                $color = $colors[$index % count($colors)];
                            @endphp
                            <button 
                                type="button" 
                                @click="state = '{{ $icon }}'; isOpen = false"
                                class="w-full aspect-square flex items-center justify-center text-white rounded shadow-sm hover:opacity-80 transition {{ $color }}"
                                title="{{ $icon }}"
                            >
                                @svg($icon, 'w-5 h-5')
                            </button>
                        @endforeach
                    </div>
                </div>
                <div class="p-4 border-t dark:border-gray-700 flex justify-end">
                    <button type="button" @click="isOpen = false" class="px-4 py-2 bg-gray-600 text-white font-medium rounded hover:bg-gray-700 text-sm">CLOSE</button>
                </div>
            </div>
        </div>
    </div>
</x-dynamic-component>
