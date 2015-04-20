<div id="chatting-last-wicket" class="last-wicket">
            <div class="lw-player-info">
                Last Wkt:<div data-target="/player?osi={{ lastWicket.i }}&opi={{ lastWicket.opi }}&uc_param_str=dnfrpfbivesscpgimibtbmntnisieijblauputoggd&stat_tab=live" class="last-wicket-name">{{ lastWicket.n }}</div> {{ lastWicket.h }} 
            </div>
            <div class="lw-match-info">
                {{ lastWicket.r }}({{ lastWicket.bf }}) - {% if lastWicket.dismissalScore %}{{ lastWicket.dismissalScore }}{% endif %}{% if lastWicket.dismissalOvers %} in {{ lastWicket.dismissalOvers }} ov{% endif %}
                <div id="chatting-full-wkts" class="last-wicket-url"><span class="text">Full Wkts</span></div>
            </div>
        </div>
        <div id="chatting-wicket-list" style="display: none;">
            <div class="wicket-list-dummy"></div>
            <div class="wicket-list-overlay">
                <div id="wicket-list" class="wicket-list">
                    <div class="wl-title">
                        <div>Fall of wickets</div>
                        <div id="top-close-btn" class="top-close-btn"></div>
                    </div>
                    <div class="loading" style="display: block; background: #ffffff">
                        <i class="img"></i>
                        <span class="text">loading...</span>
                    </div>
                    <div>
                        <div id="wl-close-btn" class="wl-close-btn">Close</div>
                    </div>
                </div>
            </div>
        </div>