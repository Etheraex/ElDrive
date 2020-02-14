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
			console.log(this.data.uploadDates);
			this.drawchart("column","test",this.data.uploadDates,"Uploads");
		});
	}
	transform(data){
		let retval = [];
		Object.keys(data).forEach(element => {
			let obj = [];
			obj.push(Date.parse(element));
			obj.push(data[element]);
			retval.push(obj);
		});
		return retval;
		console.log(retval);
	}
	drawchart(type,dataName,data,title){
		data = this.transform(data);
		console.log(data);
		Highcharts.chart( {
			chart:{

				renderTo:'container',
				
			},
			title: {
				text: title
			},
			
			series:[{type:type,name:dataName,data:data}],

		
			yAxis: {
				title: {
					text: 'Number of uploads'
				}
			},
			
			xAxis: {
				title: {
					text:'Date'
				},
				type:'datetime'
			},
			
			legend: {
				layout: 'vertical',
				align: 'right',
				verticalAlign: 'middle'
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
