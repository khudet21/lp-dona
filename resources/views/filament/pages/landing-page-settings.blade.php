<x-filament-panels::page>
    <div x-data="{
            currentViewport: 'desktop',
            updateScale() {
                const stage = this.$refs.previewStage;
                const iframe = this.$refs.previewFrame;
                if (!stage || !iframe) return;
                
                const stageWidth = stage.clientWidth - 20;
                const stageHeight = stage.clientHeight - 20;
                if (stageWidth <= 0 || stageHeight <= 0) return;
                
                let baseWidth;
                if (this.currentViewport === 'desktop') {
                    baseWidth = 1280;
                } else if (this.currentViewport === 'tablet') {
                    baseWidth = 768;
                } else {
                    baseWidth = 390;
                }
                
                const scale = Math.min(1, stageWidth / baseWidth);
                const baseHeight = stageHeight / scale;
                
                iframe.style.width = baseWidth + 'px';
                iframe.style.height = baseHeight + 'px';
                iframe.style.transform = `scale(${scale})`;
                
                const wrapper = iframe.parentElement;
                wrapper.style.width = (baseWidth * scale) + 'px';
                wrapper.style.height = (baseHeight * scale) + 'px';
            },
            init() {
                window.addEventListener('resize', () => this.updateScale());
                setTimeout(() => this.updateScale(), 500);
                
                // Polling for live preview (menjamin semua komponen kustom seperti ColorPicker sinkron)
                if (this.$wire) {
                    let lastData = '';
                    setInterval(() => {
                        let currentData = JSON.stringify(this.$wire.data);
                        if (currentData !== lastData) {
                            lastData = currentData;
                            this.sendLiveUpdate();
                        }
                    }, 500);
                }
            },
            sendLiveUpdate() {
                // Gunakan state bawaan Livewire v3 (this.$wire)
                if (this.$wire && this.$wire.data) {
                    // this.$wire.data adalah Proxy, kita perlu parse ke plain object agar bisa di-postMessage
                    let settings = JSON.parse(JSON.stringify(this.$wire.data));
                    
                    if(this.$refs.previewFrame && this.$refs.previewFrame.contentWindow) {
                        this.$refs.previewFrame.contentWindow.postMessage({
                            type: 'updateSettings',
                            settings: settings || {}
                        }, '*');
                    }
                }
            }
         }"
         style="display: flex; flex-wrap: wrap; gap: 1.5rem; align-items: flex-start;"
    >
        
        {{-- Form Sebelah Kiri --}}
        <div style="flex: 1 1 40%; min-width: 320px;">
            <form wire:submit="save" @input.debounce.300ms="sendLiveUpdate" class="space-y-6">
                {{ $this->form }}

                <div style="margin-top: 3rem; display: flex; gap: 0.75rem; flex-wrap: wrap;">
                    <x-filament::button type="submit" size="lg">
                        Simpan Perubahan
                    </x-filament::button>
                    
                    <x-filament::button wire:click="resetThemeSettings" type="button" color="danger" size="lg" icon="heroicon-o-arrow-path">
                        Reset Tema (Default)
                    </x-filament::button>
                    
                    <x-filament::button tag="a" href="/" target="_blank" color="gray" size="lg" icon="heroicon-o-arrow-top-right-on-square">
                        Buka di Tab Baru
                    </x-filament::button>
                </div>
            </form>
        </div>

        {{-- Live Preview Sebelah Kanan --}}
        <div style="flex: 1 1 50%; min-width: 320px; height: 850px; position: sticky; top: 1.5rem;" class="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm overflow-hidden hidden lg:flex flex-col">
            <div class="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-white/10 px-4 py-3 flex items-center justify-between gap-2 shrink-0">
                <div class="flex gap-1.5 w-20">
                    <div class="w-3 h-3 rounded-full bg-red-400"></div>
                    <div class="w-3 h-3 rounded-full bg-amber-400"></div>
                    <div class="w-3 h-3 rounded-full bg-green-400"></div>
                </div>

                {{-- Viewport Selector (Hanya Icon) --}}
                <div class="flex items-center gap-1 bg-gray-200/70 dark:bg-gray-700/60 p-1 rounded-xl">
                    <button type="button" @click="currentViewport = 'desktop'; updateScale()" title="Desktop View"
                            :class="currentViewport === 'desktop' ? 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 shadow-sm' : 'text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'"
                            class="p-2 rounded-lg transition">
                        <x-filament::icon icon="heroicon-m-computer-desktop" class="w-5 h-5" />
                    </button>
                    <button type="button" @click="currentViewport = 'tablet'; updateScale()" title="Tablet View"
                            :class="currentViewport === 'tablet' ? 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 shadow-sm' : 'text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'"
                            class="p-2 rounded-lg transition">
                        <x-filament::icon icon="heroicon-m-device-tablet" class="w-5 h-5" />
                    </button>
                    <button type="button" @click="currentViewport = 'mobile'; updateScale()" title="Mobile View"
                            :class="currentViewport === 'mobile' ? 'bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-200 shadow-sm' : 'text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'"
                            class="p-2 rounded-lg transition">
                        <x-filament::icon icon="heroicon-m-device-phone-mobile" class="w-5 h-5" />
                    </button>
                </div>

                <div class="w-20 flex justify-end"></div>
            </div>
            
            <div x-ref="previewStage" class="flex-1 bg-gray-50 dark:bg-gray-950 p-4 overflow-hidden flex justify-center items-start relative" style="height: 100%;">
                <div style="transition: all 0.3s; border-radius: 0.75rem; overflow: hidden; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); border: 1px solid #e5e7eb; background: white; position: relative; max-width: 100%;">
                    <iframe 
                        x-ref="previewFrame"
                        src="/" 
                        @load="updateScale"
                        style="border: none; background: white; transform-origin: top left;"
                        title="Live Preview"
                    ></iframe>
                </div>
            </div>
        </div>
    </div>
</x-filament-panels::page>
