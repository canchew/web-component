<div id="content" class="coverage-content clearfix">
{% if summaryList && summaryList.length >=1 && resultList && resultList.length>=1 %}
	<input id="competition-id" type="hidden" value="{{competitionId}}" />
	<table width="100%" border="0" cellspacing="0" cellpadding="0" class="table-data-style">
        <tbody>
            <tr>
                <th width="40%">Summary</th>
                <!-- 胜负比 -->
                <th width="20%">W/L</th>
                <!--  胜率 -->
                <th width="20%">Won</th>
                <!-- 负率 -->
                <th width="20%">Lose</th>
            </tr>
            
            {% for item in summaryList %}
            <tr>
                <td class="rowDataStyle">
                    {% if item.teamUrl %}
                        <a href="{{ item.teamUrl }}">{{ item.team }}</a>
                    {% else %}
                        {{ item.team }}
                    {% endif %}
                </td>
                <td>{{ item.wonLost }}</td>
                <td>{{ item.wonPercent }}%</td>
                <td class="rowDataStyle">{{ item.lostPercent }}%</td>
            </tr>
            {% endfor %}
        </tbody>
    </table>
    <table width="100%" border="0" cellspacing="0" cellpadding="0" class="table-data-style">
        <tbody id="resultList" data-page="0">
            <tr>
                <th width="40%">History</th>
                <!-- 胜利方 -->
                <th width="20%">Winner</th>
                <!--  分差 -->
                <th width="30%">Margin</th>
                <th width="10%"></th>
            </tr>
            {% for item in resultList %}
            <tr>
                <td class="rowDataStyle">{{ item.displayDate }}</td>
                <td>
                    {% if item.winnerTeamUrl %}
                        <a href="{{ item.winnerTeamUrl }}">{{ item.winner }}</a>
                    {% else %}
                        {{ item.winner }}
                    {% endif %}
                </td>
                <td class="rowDataStyle">{{ item.margin }}</td>
                <td class="scorecard-wrap">
                    <a class="scorecard-text" href="{{ item.mScorecardUrl }}"></a>
                </td>
            </tr>
            {% endfor %}
        </tbody>
    </table>
    <div data-info="true" class="load">
        {%if  !resultList || resultList.length == 0 %}
        <span >no results temporarily</span>
        {%endif%}
        {%if  resultList.length > 0 && resultList.length < 20 %}
        <span >no more results</span>
        {%endif%}
        {%if  resultList.length == 20 %}
        <span >Loading More......</span>
        {%endif%}
    </div>
{%else%}
    <p class="no-info-text">
        No match history about the match temporarily
    </p>
{%endif%}
</div>

{% script %}
	require('pages/coverage-index').init();
{% endscript %}