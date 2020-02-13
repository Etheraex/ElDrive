import { Component, OnInit } from '@angular/core';
import { StatisticsService } from 'src/app/services/statistics.service';
import { Statistics } from 'src/app/models/statistics.model';
import * as Highcharts  from 'highcharts';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {

	data : Statistics;
	constructor(private statisticsService : StatisticsService) {
		this.data = new Statistics();
	}
	
	ngOnInit() {
		this.statisticsService.getStatistics()
		.subscribe((result : Statistics) => {
			this.data = result;
		})
		this.drawchart();
	}
	
	drawchart(){
		Highcharts.chart( {
			chart:{

				renderTo:'container',
				
			},
			title: {
				text: 'Solar Employment Growth by Sector, 2010-2016'
			},
			
			series:[{type:"line",name:"test",data:[43,22]}],

			subtitle: {
				text: 'Source: thesolarfoundation.com'
			},
		
			yAxis: {
				title: {
					text: 'Number of Employees'
				}
			},
			
			xAxis: {
				accessibility: {
					rangeDescription: 'Range: 2010 to 2017'
				}
			},
			
			legend: {
				layout: 'vertical',
				align: 'right',
				verticalAlign: 'middle'
			},
			
			plotOptions: {
				series: {
					label: {
						connectorAllowed: false
					},
					pointStart: 2010
				}
			},
			
			
			responsive: {
				rules: [{
					condition: {
						maxWidth: 500
					},
					chartOptions: {
						legend: {
							layout: 'horizontal',
							align: 'center',
							verticalAlign: 'bottom'
						}
					}
				}]
			}
			
		});
	}

}
